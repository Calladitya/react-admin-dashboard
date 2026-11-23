import { useMemo, useState } from 'react';
import { MoreHorizontal, Paperclip, Phone, Search, Send, Video } from 'lucide-react';
import './WorkspacePages.css';

const initialConversations = [
  {
    id: 1,
    name: 'Ava Patel',
    role: 'Product Designer',
    initials: 'AP',
    color: '#7658e8',
    online: true,
    time: '10:24 AM',
    messages: [
      { id: 1, from: 'them', text: 'Hey! I shared the latest dashboard concepts with you.', time: '10:18 AM' },
      { id: 2, from: 'me', text: 'Just had a look. The new layout is looking great.', time: '10:21 AM' },
      { id: 3, from: 'them', text: 'Thanks! Let me know if you want any changes before the review.', time: '10:24 AM' },
    ],
  },
  {
    id: 2,
    name: 'Liam Carter',
    role: 'Frontend Developer',
    initials: 'LC',
    color: '#328bd5',
    online: true,
    time: '9:42 AM',
    messages: [
      { id: 1, from: 'them', text: 'The new project build is ready for testing.', time: '9:42 AM' },
    ],
  },
  {
    id: 3,
    name: 'Mia Chen',
    role: 'Project Manager',
    initials: 'MC',
    color: '#de8b3c',
    online: false,
    time: 'Yesterday',
    messages: [
      { id: 1, from: 'them', text: 'I added the planning notes to the project board.', time: 'Yesterday' },
      { id: 2, from: 'me', text: 'Perfect, thank you!', time: 'Yesterday' },
    ],
  },
  {
    id: 4,
    name: 'Noah Williams',
    role: 'Marketing Lead',
    initials: 'NW',
    color: '#2ca77a',
    online: false,
    time: 'Monday',
    messages: [
      { id: 1, from: 'them', text: 'Can we review the launch plan this week?', time: 'Monday' },
    ],
  },
];

function Messages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(initialConversations[0].id);
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');

  const activeConversation = conversations.find(({ id }) => id === activeId);
  const visibleConversations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return conversations.filter((conversation) =>
      `${conversation.name} ${conversation.role}`.toLowerCase().includes(normalizedSearch)
    );
  }, [conversations, search]);

  const handleSend = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !activeConversation) return;

    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setConversations((currentConversations) => currentConversations.map((conversation) => (
      conversation.id === activeId
        ? {
            ...conversation,
            time,
            messages: [...conversation.messages, { id: Date.now(), from: 'me', text, time }],
          }
        : conversation
    )));
    setDraft('');
  };

  return (
    <main className="workspace-page">
      <header className="workspace-header">
        <div>
          <p className="workspace-eyebrow">TEAM INBOX</p>
          <h1>Messages</h1>
          <p className="workspace-subtitle">Catch up with your team and keep work moving.</p>
        </div>
      </header>

      <section className="workspace-panel message-layout">
        <aside className="message-sidebar">
          <label className="workspace-search message-search">
            <Search size={16} aria-hidden="true" />
            <span className="workspace-visually-hidden">Search conversations</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search messages"
            />
          </label>
          <div className="message-sidebar-heading">
            <h2>Recent chats</h2>
            <span>{visibleConversations.length}</span>
          </div>
          <div className="conversation-list">
            {visibleConversations.map((conversation) => {
              const lastMessage = conversation.messages[conversation.messages.length - 1];
              return (
                <button
                  className={`conversation-item${activeId === conversation.id ? ' is-active' : ''}`}
                  key={conversation.id}
                  type="button"
                  onClick={() => setActiveId(conversation.id)}
                >
                  <span
                    className="message-avatar"
                    style={{ '--avatar-color': conversation.color }}
                    aria-hidden="true"
                  >
                    {conversation.initials}
                    {conversation.online && <i />}
                  </span>
                  <span className="conversation-copy">
                    <span className="conversation-name">{conversation.name}</span>
                    <span className="conversation-preview">{lastMessage.text}</span>
                  </span>
                  <span className="conversation-time">{conversation.time}</span>
                </button>
              );
            })}
            {visibleConversations.length === 0 && (
              <p className="workspace-empty">No conversations found.</p>
            )}
          </div>
        </aside>

        {activeConversation ? (
          <section className="message-thread" aria-label={`Chat with ${activeConversation.name}`}>
            <header className="message-thread-header">
              <span
                className="message-avatar"
                style={{ '--avatar-color': activeConversation.color }}
                aria-hidden="true"
              >
                {activeConversation.initials}
                {activeConversation.online && <i />}
              </span>
              <div className="message-person">
                <h2>{activeConversation.name}</h2>
                <p>{activeConversation.online ? 'Online' : activeConversation.role}</p>
              </div>
              <div className="message-actions">
                <button type="button" aria-label="Start voice call"><Phone size={17} /></button>
                <button type="button" aria-label="Start video call"><Video size={17} /></button>
                <button type="button" aria-label="More conversation options"><MoreHorizontal size={19} /></button>
              </div>
            </header>

            <div className="message-list" aria-live="polite">
              <p className="message-date-divider">Today</p>
              {activeConversation.messages.map((message) => (
                <article
                  className={`message-bubble-row${message.from === 'me' ? ' is-mine' : ''}`}
                  key={message.id}
                >
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <time>{message.time}</time>
                  </div>
                </article>
              ))}
            </div>

            <form className="message-composer" onSubmit={handleSend}>
              <button type="button" aria-label="Attach a file"><Paperclip size={18} /></button>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Write a message..."
                aria-label="Write a message"
              />
              <button className="message-send" type="submit" disabled={!draft.trim()} aria-label="Send message">
                <Send size={17} />
              </button>
            </form>
          </section>
        ) : (
          <div className="message-thread message-empty-thread">
            <p>Select a conversation to see messages.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Messages;
