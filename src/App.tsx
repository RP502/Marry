import React, { useState, useEffect } from 'react';
import { ViewMode, Language, WeddingData, Guest, WishItem, WeddingTemplate } from './types';
import {
  INITIAL_WEDDING_DATA,
  INITIAL_GUESTS,
  INITIAL_WISHES,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { WeddingBuilder } from './components/WeddingBuilder';
import { InvitationView } from './components/InvitationView';
import { RsvpDashboard } from './components/RsvpDashboard';
import { TemplatesPage } from './components/TemplatesPage';
import { ShareModal } from './components/ShareModal';
import { FallingEffect } from './components/FallingEffect';
import { WeddingToolsHub } from './components/WeddingToolsHub';
import { BlogPage } from './components/BlogPage';
import { PricingPage } from './components/PricingPage';
import { AdminPortal } from './components/AdminPortal';
import { AuthModalOrView } from './components/AuthModalOrView';
import { UserDashboard } from './components/UserDashboard';
import { AccountSettings } from './components/AccountSettings';
import { PaymentCheckout } from './components/PaymentCheckout';
import { PublicAnalyticsView } from './components/PublicAnalyticsView';
import { ShareCenterPage } from './components/ShareCenterPage';
import { GuestViewerPage } from './components/GuestViewerPage';
import { INITIAL_USER_ACCOUNT } from './data/adminMockData';
import { UserAccount } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [lang, setLang] = useState<Language>('vi');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [guestParam, setGuestParam] = useState<string | undefined>(undefined);

  // Authenticated user state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('chungdoi_current_user');
      return saved ? JSON.parse(saved) : INITIAL_USER_ACCOUNT;
    } catch {
      return INITIAL_USER_ACCOUNT;
    }
  });

  // Load state from localStorage if available
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem('chungdoi_wedding_data');
      return saved ? JSON.parse(saved) : INITIAL_WEDDING_DATA;
    } catch {
      return INITIAL_WEDDING_DATA;
    }
  });

  const [guests, setGuests] = useState<Guest[]>(() => {
    try {
      const saved = localStorage.getItem('chungdoi_guests');
      return saved ? JSON.parse(saved) : INITIAL_GUESTS;
    } catch {
      return INITIAL_GUESTS;
    }
  });

  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const saved = localStorage.getItem('chungdoi_wishes');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  // Check URL query params and pathname on initial mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('guest');
    const view = params.get('view');
    const path = window.location.pathname.replace(/^\/vi\//, '/').replace(/^\//, '').replace(/\/$/, '');

    if (guest) {
      setGuestParam(decodeURIComponent(guest));
      setCurrentView('invitation');
    } else if (view) {
      if (view === 'edit') {
        setCurrentView('builder');
      } else {
        setCurrentView(view as ViewMode);
      }
    } else if (path) {
      if (path === 'edit') {
        setCurrentView('builder');
      } else if ([
        'admin',
        'dashboard',
        'login',
        'signup',
        'verify-magic-link',
        'xac-minh',
        'account',
        'payment',
        'xem-khach',
        'public-analytics',
        'share',
        'tools',
        'blog',
        'pricing',
        'templates',
        'invitation',
        'rsvp-dashboard',
      ].includes(path)) {
        setCurrentView(path as ViewMode);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('chungdoi_wedding_data', JSON.stringify(weddingData));
    } catch (e) {
      console.error('Failed to save wedding data', e);
    }
  }, [weddingData]);

  useEffect(() => {
    try {
      localStorage.setItem('chungdoi_guests', JSON.stringify(guests));
    } catch (e) {
      console.error('Failed to save guests', e);
    }
  }, [guests]);

  useEffect(() => {
    try {
      localStorage.setItem('chungdoi_wishes', JSON.stringify(wishes));
    } catch (e) {
      console.error('Failed to save wishes', e);
    }
  }, [wishes]);

  // Handle template selection
  const handleSelectTemplate = (template: WeddingTemplate) => {
    setWeddingData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        templateId: template.id,
        primaryColor: template.themeColor,
      },
    }));
  };

  // Add guest from builder or dashboard
  const handleAddGuest = (guestData: Omit<Guest, 'id' | 'createdAt'>) => {
    const newGuest: Guest = {
      ...guestData,
      id: `guest-${Date.now()}`,
      createdAt: new Date().toISOString(),
      sent: false,
    };
    setGuests((prev) => [newGuest, ...prev]);
  };

  // Add guest from public RSVP form
  const handleAddRsvp = (guestData: Omit<Guest, 'id' | 'createdAt' | 'sent'>) => {
    const newGuest: Guest = {
      ...guestData,
      id: `guest-${Date.now()}`,
      createdAt: new Date().toISOString(),
      sent: true,
    };
    setGuests((prev) => [newGuest, ...prev]);
  };

  // Update guest status
  const handleUpdateGuestStatus = (
    guestId: string,
    status: 'attending' | 'not_attending' | 'tentative' | 'pending'
  ) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, attendingStatus: status } : g))
    );
  };

  // Delete guest
  const handleDeleteGuest = (guestId: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== guestId));
  };

  // Toggle guest sent status
  const handleToggleSent = (guestId: string) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, sent: !g.sent } : g))
    );
  };

  // Add wish
  const handleAddWish = (wishData: Omit<WishItem, 'id' | 'createdAt' | 'likes'>) => {
    const newWish: WishItem = {
      ...wishData,
      id: `wish-${Date.now()}`,
      createdAt: 'Vừa xong',
      likes: 1,
    };
    setWishes((prev) => [newWish, ...prev]);
  };

  // Like wish
  const handleLikeWish = (wishId: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col selection:bg-rose-100 selection:text-rose-900">
      {/* Falling romantic particle effect (petals, hearts, sparkles) */}
      <FallingEffect
        type={
          currentView === 'invitation' || currentView === 'landing'
            ? weddingData.theme.effect
            : 'none'
        }
        density={20}
      />

      {/* Main Navbar - sticky across views except inside full invitation recipient mode */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onToggleLang={handleToggleLang}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          localStorage.removeItem('chungdoi_current_user');
          setCurrentView('landing');
        }}
      />

      {/* View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectTemplate={handleSelectTemplate}
            lang={lang}
          />
        )}

        {currentView === 'templates' && (
          <TemplatesPage
            onSelectTemplate={handleSelectTemplate}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {currentView === 'builder' && (
          <WeddingBuilder
            weddingData={weddingData}
            onUpdateWeddingData={setWeddingData}
            onPreviewFull={() => {
              setCurrentView('invitation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            lang={lang}
          />
        )}

        {currentView === 'invitation' && (
          <InvitationView
            weddingData={weddingData}
            guestName={guestParam}
            onBackToHome={() => {
              setCurrentView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToStudio={() => {
              setCurrentView('builder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddRsvp={handleAddRsvp}
            onAddWish={handleAddWish}
            wishes={wishes}
            onLikeWish={handleLikeWish}
          />
        )}

        {currentView === 'rsvp-dashboard' && (
          <RsvpDashboard
            guests={guests}
            weddingData={weddingData}
            onAddGuest={handleAddGuest}
            onUpdateGuestStatus={handleUpdateGuestStatus}
            onDeleteGuest={handleDeleteGuest}
            onToggleSent={handleToggleSent}
          />
        )}

        {(currentView === 'tools' ||
          currentView === 'budget-calc' ||
          currentView === 'wedding-plan' ||
          currentView === 'invitation-messages' ||
          currentView === 'speeches' ||
          currentView === 'save-the-date' ||
          currentView === 'compress-image' ||
          currentView === 'seating-chart' ||
          currentView === 'lunar-converter') && (
          <WeddingToolsHub
            initialTab={
              currentView === 'budget-calc'
                ? 'budget'
                : currentView === 'wedding-plan'
                ? 'checklist'
                : currentView === 'invitation-messages'
                ? 'messages'
                : currentView === 'speeches'
                ? 'speeches'
                : currentView === 'save-the-date'
                ? 'savethedate'
                : currentView === 'compress-image'
                ? 'compress'
                : currentView === 'seating-chart'
                ? 'seating'
                : currentView === 'lunar-converter'
                ? 'lunar'
                : 'budget'
            }
            weddingData={weddingData}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {currentView === 'pricing' && (
          <PricingPage
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {/* Admin Portal (/admin/) */}
        {currentView === 'admin' && (
          <AdminPortal
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* User Dashboard (/dashboard/) */}
        {currentView === 'dashboard' && (
          <UserDashboard
            user={currentUser}
            weddingData={weddingData}
            guests={guests}
            wishes={wishes}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />
        )}

        {/* Account Settings (/account) */}
        {currentView === 'account' && (
          <AccountSettings
            user={currentUser}
            weddingData={weddingData}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateUser={(updatedUser) => {
              setCurrentUser(updatedUser);
              localStorage.setItem('chungdoi_current_user', JSON.stringify(updatedUser));
            }}
          />
        )}

        {/* Payment & Checkout (/payment) */}
        {currentView === 'payment' && (
          <PaymentCheckout
            user={currentUser}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPaymentSuccess={(plan) => {
              if (currentUser) {
                const updated = { ...currentUser, plan };
                setCurrentUser(updated);
                localStorage.setItem('chungdoi_current_user', JSON.stringify(updated));
              }
            }}
          />
        )}

        {/* Public Analytics (/public-analytics) */}
        {currentView === 'public-analytics' && (
          <PublicAnalyticsView
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Share & Print QR Center (/share/) */}
        {currentView === 'share' && (
          <ShareCenterPage
            weddingData={weddingData}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Guest Viewer & RSVP List (/xem-khach/) */}
        {currentView === 'xem-khach' && (
          <GuestViewerPage
            guests={guests}
            weddingData={weddingData}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddGuest={handleAddGuest}
            onUpdateGuestStatus={handleUpdateGuestStatus}
            onDeleteGuest={handleDeleteGuest}
            onToggleSent={handleToggleSent}
          />
        )}

        {/* Auth & Verification Views (/login, /signup, /verify-magic-link, /xac-minh) */}
        {(currentView === 'login' ||
          currentView === 'signup' ||
          currentView === 'verify-magic-link' ||
          currentView === 'xac-minh') && (
          <AuthModalOrView
            mode={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAuthSuccess={(user) => {
              setCurrentUser(user);
              localStorage.setItem('chungdoi_current_user', JSON.stringify(user));
              setCurrentView('dashboard');
            }}
          />
        )}
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        weddingData={weddingData}
      />
    </div>
  );
}
