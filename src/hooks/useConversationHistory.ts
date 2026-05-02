import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  settings?: ConversationSettings;
}

interface ConversationSettings {
  mood: 'energetic' | 'balanced' | 'calm';
  messageLength: 'short' | 'medium' | 'long';
  communicationStyle: 'basic' | 'casual' | 'expert';
}

interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export const useConversationHistory = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadConversations = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('agent_conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      // Type cast conversations with settings
      const typedConversations = (data || []).map(conv => ({
        ...conv,
        settings: (conv.settings as unknown) as ConversationSettings | undefined
      }));
      
      setConversations(typedConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }, []);

  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('agent_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Type cast to ensure proper role types
      const typedMessages = (data || []).map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant' | 'system'
      }));
      
      setMessages(typedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  }, []);

  const createNewConversation = useCallback(async (settings?: ConversationSettings) => {
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('User not authenticated');

      // Get user's current tenant
      const { data: memberships, error: membershipError } = await supabase
        .from('user_memberships')
        .select('tenant_id')
        .eq('user_id', user.id)
        .limit(1);

      if (membershipError || !memberships?.length) {
        throw new Error('No tenant found for user');
      }

      const { data, error } = await supabase
        .from('agent_conversations')
        .insert([{
          title: 'New Conversation',
          user_id: user.id,
          tenant_id: memberships[0].tenant_id,
          settings: settings || {
            mood: 'balanced',
            messageLength: 'medium',
            communicationStyle: 'casual'
          }
        }])
        .select()
        .single();

      if (error) throw error;

      // Type cast the conversation
      const newConversation: Conversation = {
        ...data,
        settings: (data.settings as unknown) as ConversationSettings | undefined
      };
      
      setCurrentConversation(newConversation);
      setMessages([]);
      setConversations(prev => [newConversation, ...prev]);
      
      return newConversation;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create new conversation",
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);

  const selectConversation = useCallback(async (conversation: Conversation) => {
    setCurrentConversation(conversation);
    await loadMessages(conversation.id);
  }, [loadMessages]);

  const updateConversationTitle = useCallback(async (conversationId: string, title: string) => {
    try {
      const { error } = await supabase
        .from('agent_conversations')
        .update({ title, updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      if (error) throw error;

      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, title, updated_at: new Date().toISOString() }
            : conv
        )
      );

      if (currentConversation?.id === conversationId) {
        setCurrentConversation(prev => prev ? { ...prev, title } : null);
      }
    } catch (error) {
      console.error('Error updating conversation title:', error);
    }
  }, [currentConversation]);

  const updateConversationSettings = useCallback(async (conversationId: string, settings: ConversationSettings) => {
    try {
      const { error } = await supabase
        .from('agent_conversations')
        .update({ settings: settings as never, updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      if (error) throw error;

      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, settings, updated_at: new Date().toISOString() }
            : conv
        )
      );

      if (currentConversation?.id === conversationId) {
        setCurrentConversation(prev => prev ? { ...prev, settings } : null);
      }
    } catch (error) {
      console.error('Error updating conversation settings:', error);
    }
  }, [currentConversation]);

  const deleteConversation = useCallback(async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('agent_conversations')
        .delete()
        .eq('id', conversationId);

      if (error) throw error;

      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }

      toast({
        title: "Conversation Deleted",
        description: "The conversation has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
    }
  }, [currentConversation, toast]);

  const addMessage = useCallback((message: AgentMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const generateConversationTitle = useCallback(async (firstMessage: string) => {
    const words = firstMessage.split(' ').slice(0, 6).join(' ');
    const title = words.length > 30 ? words.substring(0, 30) + '...' : words;
    return title || 'New Conversation';
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return {
    conversations,
    currentConversation,
    messages,
    isLoading,
    setIsLoading,
    createNewConversation,
    selectConversation,
    updateConversationTitle,
    updateConversationSettings,
    deleteConversation,
    addMessage,
    setMessages,
    generateConversationTitle,
    loadConversations
  };
};