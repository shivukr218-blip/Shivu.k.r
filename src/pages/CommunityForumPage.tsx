import React, { useEffect, useState } from 'react';
import { ThumbsUp, MessageCircle, ShieldCheck, Send, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_FORUM_POSTS } from '../data/modulesData';
import type { ForumPost } from '../types';
import { VoiceButton } from '../components/VoiceButton';

const CATEGORIES: Array<'All' | ForumPost['category']> = [
  'All',
  'Banking',
  'Fraud Alerts',
  'Farming & Loans',
  'Savings',
];

export const CommunityForumPage: React.FC = () => {
  const { language, unlockBadge } = useApp();
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    try {
      const saved = localStorage.getItem('gramfin_forum_posts');
      return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
    } catch {
      return INITIAL_FORUM_POSTS;
    }
  });

  const [filter, setFilter] = useState<'All' | ForumPost['category']>('All');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);

  // New question form
  const [author, setAuthor] = useState('');
  const [village, setVillage] = useState('');
  const [category, setCategory] = useState<ForumPost['category']>('Banking');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    localStorage.setItem('gramfin_forum_posts', JSON.stringify(posts));
  }, [posts]);

  const containsSensitiveDigits = (text: string) => /\b\d{10,12}\b/.test(text);

  const handleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              upvotes: p.upvotedByMe ? p.upvotes - 1 : p.upvotes + 1,
              upvotedByMe: !p.upvotedByMe,
            }
          : p
      )
    );
    unlockBadge('village-guardian');
  };

  const handleReply = (postId: string) => {
    const text = (replyDrafts[postId] || '').trim();
    if (!text) return;
    if (containsSensitiveDigits(text)) {
      setFormError('For your safety, never post 10-digit phone numbers, Aadhaar, or bank account numbers in public replies.');
      return;
    }
    setFormError('');
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              replies: [
                ...p.replies,
                {
                  id: `r-${Date.now()}`,
                  author: author.trim() || 'Village Member',
                  village: village.trim() || 'Community Peer',
                  text,
                  timestamp: 'Just now',
                },
              ],
            }
          : p
      )
    );
    setReplyDrafts((prev) => ({ ...prev, [postId]: '' }));
    unlockBadge('village-guardian');
  };

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setFormError('Please enter both a question title and details.');
      return;
    }
    if (containsSensitiveDigits(body) || containsSensitiveDigits(title)) {
      setFormError('Safety Guard: Detected a 10–12 digit number. Please remove phone, Aadhaar, or account numbers before posting.');
      return;
    }
    setFormError('');
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      author: author.trim() || 'GramFin Member',
      village: village.trim() || 'Rural India',
      category,
      title: title.trim(),
      body: body.trim(),
      upvotes: 1,
      upvotedByMe: true,
      timestamp: 'Just now',
      replies: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    setTitle('');
    setBody('');
    unlockBadge('village-guardian');
  };

  const filteredPosts = filter === 'All' ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 08 · Moderated Peer Q&amp;A
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi' ? 'समुदाय मंच (Q&A)' : language === 'kn' ? 'ಸಮುದಾಯ ವೇದಿಕೆ (Q&A)' : 'Community Forum'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            Share scam warnings, KCC loan experiences, and SHG savings tips safely with fellow villagers.
          </p>
        </div>
        <VoiceButton
          text="Welcome to the GramFin Community Forum. Moderation rule: never share your phone number, Aadhaar number, bank account, or OTP in public questions."
          id="forum-voice"
        />
      </div>

      {/* Safety Moderation Notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#9B111E]/25 bg-[#9B111E]/6 p-4 dark:border-[#E0115F]/40 dark:bg-[#E0115F]/12">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9B111E] dark:text-[#FF6B93]" />
        <p className="text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
          <strong>Community Safety Notice:</strong> GramFin moderators never ask for OTP, PIN, Aadhaar, or mobile numbers. Posts containing 10–12 digit numbers are automatically blocked to protect your privacy.
        </p>
      </div>

      {formError && (
        <div role="alert" className="flex items-center gap-2 rounded-2xl border border-[#9B111E] bg-[#9B111E]/10 p-3.5 text-sm font-medium text-[#9B111E] dark:text-[#FF6B93]">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Feed Column */}
        <div className="space-y-5 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-neutral-100 p-1.5 dark:bg-[#1B1B1F]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-white text-[#9B111E] shadow-sm dark:bg-[#27272E] dark:text-[#FF5C8A]'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-[20px] border border-neutral-200 bg-white p-5 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  <strong className="text-neutral-800 dark:text-neutral-200">{post.author}</strong>
                  <span aria-hidden="true"> · </span>
                  <span>{post.village}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{post.category}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{post.timestamp}</span>
                </div>
                <VoiceButton text={`${post.title}. ${post.body}`} id={`post-${post.id}`} compact />
              </div>

              <h2 className="font-display mt-2 text-lg font-bold text-neutral-900 dark:text-white">{post.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{post.body}</p>

              <div className="mt-4 flex items-center gap-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => handleUpvote(post.id)}
                  className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    post.upvotedByMe
                      ? 'bg-[#9B111E] text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
                  }`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span className="font-mono-num">{post.upvotes}</span>
                  Helpful
                </button>

                <button
                  type="button"
                  onClick={() => setOpenReplyId(openReplyId === post.id ? null : post.id)}
                  className="inline-flex min-h-[38px] items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-[#9B111E] dark:text-neutral-300 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-mono-num">{post.replies.length}</span> Replies
                </button>
              </div>

              {(openReplyId === post.id || post.replies.length > 0) && (
                <div className="mt-3 space-y-2.5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  {post.replies.map((rep) => (
                    <div key={rep.id} className="rounded-xl bg-[#FAFAFA] p-3 text-xs dark:bg-[#141417]">
                      <span className="font-semibold text-neutral-900 dark:text-white">{rep.author}</span>
                      <span className="text-neutral-500"> · {rep.village} · {rep.timestamp}</span>
                      <p className="mt-1 text-neutral-700 dark:text-neutral-300">{rep.text}</p>
                    </div>
                  ))}

                  {openReplyId === post.id && (
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={replyDrafts[post.id] || ''}
                        onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                        placeholder="Write a helpful reply (no phone numbers)…"
                        className="flex-1 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs dark:border-neutral-700 dark:bg-[#141417]"
                      />
                      <button
                        type="button"
                        onClick={() => handleReply(post.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-[#9B111E] px-4 py-2 text-xs font-semibold text-white cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Ask a Question Form */}
        <form
          onSubmit={handleNewPost}
          className="h-fit space-y-4 rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow lg:col-span-5 dark:border-neutral-800 dark:bg-[#1B1B1F]"
        >
          <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
            Ask a Question or Share a Scam Tip
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Your Name</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., Sunita"
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3 py-2 text-sm dark:border-neutral-700 dark:bg-[#141417]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Village / Block</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g., Wardha"
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3 py-2 text-sm dark:border-neutral-700 dark:bg-[#141417]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Topic</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ForumPost['category'])}
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3 py-2 text-sm dark:border-neutral-700 dark:bg-[#141417]"
            >
              <option value="Banking">Banking</option>
              <option value="Fraud Alerts">Fraud Alerts</option>
              <option value="Farming & Loans">Farming &amp; Loans</option>
              <option value="Savings">Savings</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Question Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., How to link mobile number at CSP?"
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3 py-2 text-sm dark:border-neutral-700 dark:bg-[#141417]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Details</label>
            <textarea
              rows={4}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe your question without sharing personal IDs or phone numbers…"
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] p-3 text-sm dark:border-neutral-700 dark:bg-[#141417]"
            />
          </div>

          <button
            type="submit"
            className="min-h-[48px] w-full rounded-full bg-[#9B111E] py-3 text-sm font-semibold text-white hover:bg-[#7F0D18] cursor-pointer"
          >
            Post Safely to Community
          </button>
        </form>
      </div>
    </div>
  );
};
