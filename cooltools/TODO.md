# phoneCompare — TODO

This file tracks planned work, open issues, and experimental ideas for the
phoneCompare project. Items are grouped by area. Use `- [x]` to mark completed
tasks and `- [ ]` for outstanding ones. Each section owner should review and
update this file at the start of every sprint.

---

## Core Features

- [x] Set up Next.js App Router scaffolding
- [x] Configure Drizzle ORM and database schema
- [x] Create phone listing page with card grid
- [x] Create side-by-side comparison view (up to 3 devices)
- [ ] Add phone search with fuzzy matching and debounce
- [ ] Implement filtering by specs (RAM, storage, camera MP, price range)
- [ ] Add multi-attribute sorting (price, release date, user rating)
- [ ] Implement cursor-based pagination for large result sets
- [ ] Add bookmarking / favorites for logged-in users
- [ ] Enable URL-based shareable comparison links
- [ ] Build "recently viewed" history stored in localStorage
- [ ] Add quick-compare floating tray (select up to 3 phones from list)
- [ ] Highlight spec differences in comparison view
- [ ] Support spec unit conversion (GB ↔ MB, mAh display)
- [ ] Add phone release-date timeline view

---

## Phone Catalog & Data

- [x] Define Drizzle schema for `phones`, `specs`, and `images` tables
- [ ] Seed database with initial catalog of 100+ devices
- [ ] Integrate upstream phone spec API (e.g., GSMA, FoneArena)
- [ ] Automate nightly sync job for new releases and price changes
- [ ] Add data-validation pipeline to flag incomplete or malformed records
- [ ] Support multiple image angles per device (front, back, side)
- [ ] Store historical pricing data per region and carrier
- [ ] Implement variant tracking (colour, storage, RAM tiers)
- [ ] Add "carrier availability" field per device
- [ ] Support tagging phones with custom labels (flagship, budget, etc.)
- [ ] Build admin import tool for CSV bulk upload
- [ ] Add discontinued flag and end-of-sale date field
- [ ] Track OEM software version alongside hardware specs
- [ ] Link devices to FCC/CE certification documents
- [ ] Add support for regional model variants (US vs international)

---

## UI & Design

- [x] Install and configure Tailwind CSS
- [x] Add dark-mode toggle with system-preference detection
- [ ] Design mobile-responsive comparison table with horizontal scroll
- [ ] Create spec-highlight cards emphasising the top 3 differences
- [ ] Add animated page transitions using Framer Motion
- [ ] Polish empty-state illustrations for search and comparison views
- [ ] Create loading skeletons for all async data sections
- [ ] Build reusable `<SpecRow>` component with tooltip explanations
- [ ] Implement sticky header on comparison table for long spec lists
- [ ] Add print stylesheet for clean comparison printouts
- [ ] Design onboarding tooltip tour for first-time visitors
- [ ] Standardise spacing and typography with a design token system
- [ ] Add micro-interactions on rating stars and favourite buttons
- [ ] Create a component library / Storybook for shared UI elements
- [ ] Audit icon set for consistency and replace one-offs with a unified pack

---

## Accessibility

- [ ] Run automated accessibility audit with axe-core on every PR
- [ ] Ensure full keyboard navigation across all interactive elements
- [ ] Add ARIA labels and roles to icon-only buttons and controls
- [ ] Implement color-blind-friendly palette
- [ ] Add support for Braille displays
- [ ] Test with VoiceOver (macOS/iOS) and NVDA (Windows) screen readers
- [ ] Provide text alternatives for all spec-category icons
- [ ] Ensure visible focus indicators in both light and dark modes
- [ ] Audit form error messages for clarity and association with inputs
- [ ] Add `prefers-reduced-motion` guard on all animations

---

## Performance

- [ ] Enable Next.js Image optimisation for device thumbnails
- [ ] Add route-level code splitting with dynamic imports
- [ ] Implement ISR (Incremental Static Regeneration) for phone detail pages
- [ ] Profile and reduce First Contentful Paint on comparison page
- [ ] Add service worker for offline catalog browsing (PWA foundation)
- [ ] Lazy-load below-the-fold images and spec sections
- [ ] Use `React.memo` and `useMemo` to prevent unnecessary re-renders
- [ ] Introduce edge caching via Vercel Edge Config for popular comparisons
- [ ] Compress spec JSON payloads before storing in the database
- [ ] Benchmark Core Web Vitals with Lighthouse CI on every deployment
- [ ] Eliminate unused CSS with PurgeCSS integration
- [ ] Profile and reduce Time to Interactive (TTI) on low-end devices

---

## Authentication & User Accounts

- [ ] Implement email/password registration and login
- [ ] Add OAuth providers (Google, GitHub, Apple)
- [ ] Build user profile page with comparison and search history
- [ ] Add account deletion and GDPR-compliant data-export flows
- [ ] Implement rate limiting on auth endpoints (login, register, reset)
- [ ] Add two-factor authentication (TOTP or SMS)
- [ ] Build "forgot password" and secure token-based reset flow
- [ ] Session management: display active sessions and allow remote logout
- [ ] Support username or display-name customisation
- [ ] Enforce strong-password policy with `zxcvbn` scoring
- [ ] Add email verification step before account activation
- [ ] Implement account-suspension workflow for policy violations

---

## Reviews & Ratings

- [ ] Allow registered users to submit textual phone reviews
- [ ] Add star-rating component with half-star precision
- [ ] Implement review moderation queue for admin approval
- [ ] Surface "most helpful" reviews with up/down voting
- [ ] Send email notifications for replies to user reviews
- [ ] Show aggregated rating breakdown (5-star histogram)
- [ ] Let users edit or delete their own reviews within a time window
- [ ] Flag reviews as "verified purchase" when tied to carrier transaction
- [ ] Add spam detection heuristics before review submission
- [ ] Export reviews as structured data for SEO rich snippets
- [ ] Support media uploads (photos/video) alongside written reviews
- [ ] Allow reviewers to tag their review by use-case (gaming, travel, etc.)

---

## Notifications & Alerts

- [ ] Add in-app notification bell with unread count badge
- [ ] Implement price-drop alerts for wishlisted phones
- [ ] Send weekly digest of new releases (opt-in, configurable frequency)
- [ ] Support push notifications via Web Push API
- [ ] Add "back in stock" alert for discontinued phones re-listed
- [ ] Allow per-device notification preferences in user settings
- [ ] Deliver alerts via both email and in-app channels
- [ ] Add notification-history page with mark-all-read action

---

## Admin Panel

- [ ] Build CRUD interface for phone catalog entries
- [ ] Create user management table with role assignment (admin/moderator/user)
- [ ] Add analytics dashboard (page views, comparisons made, searches)
- [ ] Implement content flagging and moderation review tools
- [ ] Provide immutable audit log of all admin actions
- [ ] Add scheduled-job monitor to track sync and alert jobs
- [ ] Build bulk-edit interface for applying spec corrections across models
- [ ] Add impersonation mode for debugging user-reported issues (with audit trail)
- [ ] Create role-based access control (RBAC) matrix document
- [ ] Add admin-only "data quality score" per phone entry

---

## Testing

- [ ] Set up Vitest for unit tests
- [ ] Add React Testing Library tests for key UI components
- [ ] Write Playwright E2E tests for core user journeys (search, compare, review)
- [ ] Configure GitHub Actions to run tests on every pull request
- [ ] Achieve ≥ 80 % line coverage on server actions and API routes
- [ ] Add snapshot tests for comparison table layout
- [ ] Mock external spec API in integration tests
- [ ] Add accessibility checks to CI with `axe-playwright`
- [ ] Write contract tests for third-party spec API responses
- [ ] Add visual regression tests with Playwright screenshots

---

## DevOps & Infrastructure

- [ ] Configure GitHub Actions CI/CD pipeline with lint + test + build stages
- [ ] Set up staging environment on Vercel with preview deployments per PR
- [ ] Add environment-variable validation at startup (Zod schema)
- [ ] Configure error monitoring with Sentry (client + server)
- [ ] Add structured logging with log levels using Pino
- [ ] Set up database migration workflow with Drizzle Kit
- [ ] Add uptime monitoring and alerting (e.g., BetterUptime)
- [ ] Document runbook for production incident response
- [ ] Implement feature flags for gradual rollouts
- [ ] Add load testing script with k6 for key API endpoints
- [ ] Set up secrets rotation policy for database credentials

---

## Security

- [ ] Audit all API routes for missing authentication and authorisation checks
- [ ] Add CSRF protection for all mutation endpoints
- [ ] Enforce HTTPS with HSTS headers (`Strict-Transport-Security`)
- [ ] Sanitise all user-supplied inputs before database writes
- [ ] Implement Content Security Policy (CSP) headers with nonce-based scripts
- [ ] Review third-party dependencies for known vulnerabilities (Dependabot)
- [ ] Add `X-Frame-Options` and `X-Content-Type-Options` headers
- [ ] Enforce parameterised queries in all raw SQL (no string concatenation)
- [ ] Set up secret scanning to prevent credentials in commits
- [ ] Rate-limit public API endpoints to prevent scraping and abuse
- [ ] Conduct annual penetration test or red-team exercise
- [ ] Document fast-charging safety ratings clearly in device spec pages
  _(Users rely on this information to assess charger compatibility and thermal risks.)_
- [ ] Add disclaimer for battery-health data accuracy and measurement methodology
- [ ] Validate file upload types and sizes in the admin image-upload flow

---

## Internationalisation (i18n)

- [ ] Integrate `next-intl` for locale-aware routing
- [ ] Translate all UI strings to Spanish, French, and German as MVP locales
- [ ] Support locale-aware number, date, and currency formatting
- [ ] Add RTL layout support for Arabic and Hebrew
- [ ] Create a contributor guide for adding and maintaining new locales
- [ ] Detect browser language on first visit and suggest locale switch
- [ ] Store user locale preference in profile settings
- [ ] Handle pluralisation rules for all supported locales
- [ ] Add locale switcher to the header navigation
- [ ] Ensure third-party embedded content (videos) respects locale

---

## Legal & Compliance

- [ ] Draft and publish Privacy Policy (GDPR + CCPA aligned)
- [ ] Add cookie-consent banner with granular category opt-in
- [ ] Publish Terms of Service
- [ ] Add DMCA takedown contact information in footer
- [ ] Review data retention policy and implement automated purge jobs
- [ ] Ensure child-safety compliance (COPPA) if targeting under-13 audience
- [ ] Add accessibility statement per EN 301 549 / WCAG 2.1 AA
- [ ] Document lawful basis for each data processing activity

---

## Documentation

- [ ] Write API reference for all server actions and REST endpoints
- [ ] Document database schema with an ERD diagram (dbdiagram.io or similar)
- [ ] Add JSDoc comments to all exported utility functions
- [ ] Create CONTRIBUTING.md with branch naming, commit conventions, and PR checklist
- [ ] Record a short demo screencast for the README
- [ ] Maintain a CHANGELOG following Keep a Changelog conventions
- [ ] Document all environment variables in `.env.example` with descriptions
- [ ] Add architecture decision records (ADRs) for major design choices
- [ ] Create a developer onboarding guide covering local setup end-to-end
- [ ] Add inline code comments to complex database queries

---

## Content & Editorial

- [ ] Publish a blog section for phone buying guides and comparisons
- [ ] Write "How to read a spec sheet" guide for non-technical users
- [ ] Create curated collections (e.g., "Best phones under $300 in 2025")
- [ ] Add editor's picks section to the homepage
- [ ] Establish editorial review process for user-submitted content
- [ ] Add video-embed support for hands-on review videos
- [ ] Build content calendar for regular buying-guide publications
- [ ] Add "trending comparisons" widget based on real-time traffic data
- [ ] Create comparison templates for popular categories (mid-range, flagship)

---

## Third-Party Integrations

- [ ] Integrate affiliate pricing links (Amazon, Best Buy) for monetisation
- [ ] Add carrier availability lookup via partner API
- [ ] Embed manufacturer support-page links on each device detail page
- [ ] Integrate YouTube Data API to surface official product videos
- [ ] Connect to price-tracking APIs for real-time buy-box pricing
- [ ] Add "compare prices at retailers" section on device detail pages
- [ ] Webhook integration for receiving spec updates from OEM partners
- [ ] Support zapier/Make integrations for power-user automations
- [ ] Add "Report a spec error" form sending alerts to the curation team
- [ ] Integrate calendar API to add phone launch events to user calendars

---

## Mobile & Progressive Web App

- [ ] Add Web App Manifest for install prompts
- [ ] Implement service worker caching strategies for offline use
- [ ] Optimise touch targets and swipe gestures for mobile viewports
- [ ] Add share-target registration so users can share phones from other apps
- [ ] Explore React Native or Expo wrapper for native app distribution
- [ ] Support biometric authentication on mobile (Web Authentication API)
- [ ] Add haptic feedback on key interactions (add to compare, favourite)
- [ ] Ensure app chrome adapts to iOS safe-area insets (notch/dynamic island)

---

## Analytics & Insights

- [ ] Integrate privacy-respecting analytics (Plausible or Fathom)
- [ ] Track most-compared phone pairs to surface trending comparisons
- [ ] Monitor search terms returning no results to identify catalog gaps
- [ ] Build internal dashboard for conversion funnel (visit → compare → click-out)
- [ ] A/B test different comparison table layouts for engagement metrics
- [ ] Set up custom events for key user actions (favourite, share, review submit)
- [ ] Export weekly analytics summary to a shared Slack channel
- [ ] Add heatmap tracking for comparison table scroll depth

---

## Community & Social

- [ ] Add per-device Q&A section for user questions
- [ ] Support user-submitted spec corrections (with moderation workflow)
- [ ] Add "phone of the month" community vote feature
- [ ] Create shareable comparison cards for social media via OG image generation
- [ ] Allow tagging comparisons with use-case labels (gaming, photography, travel)
- [ ] Add leaderboard for top contributors (most reviews, corrections accepted)
- [ ] Enable following other users and seeing their recent comparisons
- [ ] Create weekly community digest highlighting popular discussions

---

## Monetisation

- [ ] Launch optional "Pro" tier with advanced filters and unlimited history
- [ ] Implement affiliate commission tracking and payout dashboard
- [ ] Add sponsored placement slots with clear "Sponsored" disclosure labels
- [ ] Explore B2B licensing of the spec database API for tech publishers
- [ ] Offer white-label comparison widget embeddable on partner sites
- [ ] Add tip-jar / supporter model for community-curated content contributors

---

## Partnerships & Growth

- [ ] Reach out to OEMs for early-access device data partnerships
- [ ] Negotiate data-sharing agreements with carrier pricing APIs
- [ ] Establish referral programme for user acquisition
- [ ] Submit app to Product Hunt on public launch day
- [ ] Pursue editorial coverage in tech publications (The Verge, GSMArena)
- [ ] Explore co-marketing opportunities with phone repair shops
- [ ] Create press kit with screenshots, logo, and product description

---

## Search & Discovery

- [ ] Implement full-text search index with PostgreSQL `tsvector`
- [ ] Add "similar phones" recommendation engine based on spec proximity
- [ ] Support natural-language queries ("best camera phone under £400")
- [ ] Build faceted search UI with collapsible filter panels
- [ ] Add autocomplete suggestions to the search bar with instant results
- [ ] Index all phone pages for search engines with a dynamic sitemap
- [ ] Implement `robots.txt` with appropriate crawl directives
- [ ] Add breadcrumb structured data to improve search result appearance
- [ ] Support search by IMEI/model number for exact device lookup
- [ ] Surface "Did you mean?" suggestions for misspelled queries

---

## Marketing & SEO

- [ ] Create Open Graph and Twitter Card meta tags for all shareable pages
- [ ] Add structured data and meta tags for SEO
- [ ] Implement canonical URLs to avoid duplicate-content penalties
- [ ] Submit sitemap to Google Search Console and Bing Webmaster Tools
- [ ] Configure 301 redirect rules for legacy URLs if domain changes
- [ ] Write targeted landing pages for high-volume queries (iPhone vs Samsung)
- [ ] A/B test page titles and meta descriptions for click-through rate
- [ ] Set up Google Analytics 4 alongside a privacy-respecting alternative
- [ ] Create an affiliate programme landing page for publisher sign-ups
- [ ] Build email capture form with lead magnet (phone buying guide PDF)

---

## Experimental / Research

> **Note:** Items in this section have not been approved for development. Each
> item must be reviewed by the product owner before any work begins. Entries
> marked ⚠️ are flagged for removal or require a written rationale and a named
> owner before they can be promoted to the regular backlog.

- [ ] Progressive Web App deep-link sharing for saved comparisons
- [ ] AI-powered spec-summary generation ("Best for photography")
- [ ] Voice-search integration using the Web Speech API
- [ ] AR feature to visualise phone size in real space (WebXR / model-viewer)
- [ ] Real-time spec-update push via WebSockets or Server-Sent Events
- [ ] Machine-learning price-drop prediction model
- [ ] Personalised phone recommendations based on individual usage patterns
- [ ] Integration with wearable devices for contextual phone suggestions
- [ ] Plugin system to allow third-party spec-data providers to register
- [ ] Federated identity across partner comparison sites (single sign-on)
- [ ] Crowdsourced real-world benchmark submissions from users
- [ ] Gamification layer: badges and points for reviews and corrections
- [ ] "Spec bingo" mini-game to help users understand phone specs
- [ ] Integration with smart home assistants (Alexa, Google Assistant skills)
- [ ] Interactive teardown viewer linked to iFixit repair guides
- [ ] Environmental impact score per device (repairability, e-waste rating)
- [ ] 5G coverage map overlay sourced from OpenCelliD data
- [ ] Camera comparison tool with side-by-side sample photo viewer
- [ ] Battery drain simulator based on real-world usage profiles
- [ ] Community-sourced open-source phone database
  _(Explore whether a community-curated dataset could supplement vendor data;
  needs a license review and governance model before any work begins.)_
- [ ] "Phone graveyard" memorial page — a browseable archive of discontinued devices
  _(User value: nostalgia browsing and historical research; needs a UX spike to
  define navigation, content scope, and ongoing maintenance cost before committing.)_
- [ ] ⚠️ NFT for premium memberships — _flagged for removal; misaligned with
  current product goals; no clear user value has been identified. Remove unless
  a named owner provides a concrete use case and business model._
- [ ] ⚠️ Blockchain for review verification — _flagged for removal; complexity
  far outweighs benefit at current scale; revisit only if fake-review abuse
  becomes a material, measurable problem with no simpler solution available._
- [ ] ⚠️ Brain-computer interface research — _flagged for removal; entirely out
  of scope for a phone comparison product; no owner, timeline, or budget
  defined. Remove from this list._
