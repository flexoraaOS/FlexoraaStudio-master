
'use client';

import React, { useState, useCallback } from 'react';
import { UnifiedInbox, Conversation } from '@/components/dashboard/agentos/UnifiedInbox';

const initialConversations: Conversation[] = [];

export default function UnifiedInboxPage() {
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

    const handleSelectConversation = useCallback((id: string | null) => {
        if (id === null) {
            setSelectedConversation(null);
        } else {
            const convo = conversations.find(c => c.id === id) || null;
            setSelectedConversation(convo);
        }
    }, [conversations]);

    const handleUpdateConversation = useCallback((updated: Conversation) => {
        setConversations(prev => prev.map(c => c.id === updated.id ? updated : c));
        setSelectedConversation(updated);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Unified Inbox</h1>
                <p className="text-muted-foreground mt-1">Manage all your conversations across channels in one place.</p>
            </div>
            <UnifiedInbox
                conversations={conversations}
                selectedConversation={selectedConversation}
                onSelectConversation={handleSelectConversation}
                onUpdateConversation={handleUpdateConversation}
            />
        </div>
    );
}
