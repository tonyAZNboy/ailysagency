import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: any;
  created_at: string;
}

export const useAIAgent = () => {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { toast } = useToast();

  const sendMessage = useCallback(async (content: string, options?: { conversationId?: string }) => {
    setIsLoading(true);
    
    // Add user message immediately
    const userMessage: AgentMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      const convId = options?.conversationId ?? conversationId;
      if (!conversationId && options?.conversationId) {
        setConversationId(options.conversationId);
      }
      const { data, error } = await supabase.functions.invoke('ai-agent', {
        body: {
          message: content,
          conversationId: convId,
          userAgent: navigator.userAgent
        }
      });

      if (error) throw error;

      // Add AI response
      const aiMessage: AgentMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.response || 'Task completed successfully',
        metadata: {
          function_call: data.function_call,
          task_result: data.task_result
        },
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Set conversation ID for future messages
      if (data.conversation_id && !conversationId) {
        setConversationId(data.conversation_id);
      }

      // Show success toast if task was executed
      if (data.task_result && !data.task_result.error) {
        toast({
          title: "Task Completed",
          description: data.task_result.message || "Task executed successfully",
        });
      }

      // Handle navigation if requested
      if (data.task_result?.page) {
        setTimeout(() => {
          window.location.hash = `#/${data.task_result.page}`;
        }, 1000);
      }

      return aiMessage;

    } catch (error) {
      console.error('Error sending message to AI agent:', error);
      
      const errorMessage: AgentMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        created_at: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to communicate with AI agent",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, toast]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    clearConversation
  };
};