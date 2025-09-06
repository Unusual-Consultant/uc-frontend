# Unusual Consultant - Mentorship Platform

A comprehensive mentorship and freelance platform connecting mentees with industry experts for career growth and skill development.

## 🚀 Features

### For Mentees
- **Personalized Mentor Matching** - AI-powered recommendations based on career goals
- **Interactive Dashboard** - Track progress, upcoming sessions, and achievements
- **Comprehensive Onboarding** - 3-step process to understand goals and preferences
- **Session Management** - Book, reschedule, and review mentorship sessions
- **Career Tools** - Resume builder, templates, and roadmaps
- **Review System** - Rate and review mentorship experiences

### For Mentors
- **Professional Profile Setup** - Showcase expertise and experience
- **Session Management** - Manage availability and mentor multiple mentees
- **Freelance Projects** - Take on consulting and project-based work
- **Earnings Dashboard** - Track income and manage withdrawals
- **Package Creation** - Design custom mentorship packages
- **Review Management** - Respond to feedback and build reputation

### Platform Features
- **Advanced Search & Filtering** - Find mentors by skills, location, and expertise
- **Real-time Chat** - Integrated messaging system
- **Video Conferencing** - Built-in video call capabilities
- **AI-Powered Tools** - Resume builder with AI assistance
- **Mobile Responsive** - Optimized for all devices
- **Secure Payments** - Integrated payment processing

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14+ (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/unusual-consultant.git
   cd unusual-consultant
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
app/
├── globals.css              # Global styles and Tailwind setup
├── layout.tsx              # Root layout component
├── page.tsx                # Homepage
├── blogs/                  # Blog listing and individual posts
├── courses/                # Course catalog and details
├── dashboard/              # General dashboard (legacy)
├── login/                  # Authentication pages
├── signup/
├── mentee/                 # Mentee-specific pages
│   ├── dashboard/          # Mentee dashboard
│   └── suggested-mentors/  # Personalized mentor recommendations
├── mentor/                 # Mentor-specific pages
│   ├── dashboard/          # Mentor management dashboard
│   ├── profile-pending/    # Profile verification status
│   └── resources/          # Mentor resources and guides
├── mentors/                # Public mentor directory
│   ├── [id]/              # Individual mentor profiles
│   └── page.tsx           # Mentor search and listing
├── onboarding/             # User onboarding flows
│   ├── mentee/            # Mentee onboarding (3 steps)
│   └── mentor/            # Mentor onboarding (5 steps)
├── resume-builder/         # AI-powered resume builder
├── roadmaps/              # Career roadmaps and learning paths
├── templates/             # Professional templates
├── reviews/               # Review system demo
└── review-demo/           # Review form demonstration

components/
├── ui/                    # shadcn/ui components
├── dashboard/             # Dashboard-specific components
├── mentor-dashboard/      # Mentor dashboard components
├── onboarding/           # Onboarding flow components
├── reviews/              # Review system components
├── header.tsx            # Navigation header
├── footer.tsx            # Site footer
├── hero-section.tsx      # Homepage hero
├── featured-mentors.tsx  # Mentor showcase
└── chat-bot.tsx          # AI assistant
```

## 🎨 UI Components

The project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible UI components:

- **Form Controls**: Button, Input, Label, Textarea, Checkbox
- **Navigation**: Tabs, Sheet (mobile drawer)
- **Data Display**: Card, Badge, Progress, Separator
- **Feedback**: Alert dialogs and notifications
- **Layout**: Grid system with Tailwind CSS

## 🔐 Authentication Flow

### User Types
- **Mentee**: Seeks mentorship and career guidance
- **Mentor**: Provides expertise and mentorship services

### Authentication Pages
- `/login` - Dual login (mentee/mentor)
- `/signup` - Account registration
- `/onboarding/mentee` - 3-step mentee onboarding
- `/onboarding/mentor` - 5-step mentor onboarding

## 📱 Key Pages & Features

### Homepage (`/`)
- Hero section with call-to-action
- Platform statistics
- Service offerings
- Featured mentors
- Testimonials
- AI chatbot

### Mentee Dashboard (`/mentee/dashboard`)
- Welcome header with progress tracking
- Suggested mentors carousel
- Quick action panel
- Upcoming sessions
- Career toolkit
- Progress tracker
- Session history

### Mentor Dashboard (`/mentor/dashboard`)
- Tabbed interface with 6 sections:
  - Overview & analytics
  - Session management
  - Freelance projects
  - Package pricing
  - Reviews & feedback
  - Earnings & withdrawals

### Mentor Directory (`/mentors`)
- Advanced search and filtering
- Grid/list view of mentors
- Skill-based filtering
- Location and price filtering
- Mobile-responsive filters

### Individual Mentor Profile (`/mentors/[id]`)
- Detailed mentor information
- Tabbed content (About, Experience, Reviews, Sessions)
- Booking interface
- Review system integration
- Quick stats sidebar

## 🎯 Onboarding Flows

### Mentee Onboarding (3 Steps)
1. **Personal Info & Goals** - Basic information and career objectives
2. **Preferences** - Mentor preferences and communication style
3. **Interests** - Skills to develop and areas of focus

### Mentor Onboarding (5 Steps)
1. **Professional Background** - Work experience and credentials
2. **Expertise & Skills** - Areas of expertise and teaching preferences
3. **Availability & Pricing** - Schedule and session pricing
4. **Profile Setup** - Bio, photo, and profile optimization
5. **Verification** - Document verification and profile review

## 🛡️ Review System

Comprehensive review system with:
- **5-star overall rating**
- **Session-specific ratings** (punctuality, communication, expertise, helpfulness)
- **Skill tags** for categorization
- **Written reviews** with guidelines
- **Mentor responses** to reviews
- **Review verification** system
- **Helpful voting** on reviews

## 📊 Analytics & Tracking

Dashboard analytics include:
- Session completion rates
- Average ratings
- Revenue tracking (mentors)
- Goal progress (mentees)
- Monthly statistics
- Performance metrics

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Font weights 600-800
- **Body**: Font weight 400-500

### Spacing
- Consistent 4px grid system
- Tailwind spacing utilities
- Component-specific padding/margins

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
```
NEXT_PUBLIC_API_URL=https://api.unusualconsultant.com
NEXT_PUBLIC_SITE_URL=https://unusualconsultant.com
```

## 🧪 Features in Development

- [ ] Real-time notifications
- [ ] Advanced video conferencing
- [ ] Mobile application
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@unusualconsultant.com or join our Slack community.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
- [Lucide](https://lucide.dev/) for the consistent icons

---

Built with ❤️ by the Unusual Consultant team