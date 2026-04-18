# 📱 CoolTools - Ultimate Phone Comparison Platform

> **Compare phones with 150+ features from GSMArena, Rtings, DXOMARK, and 25+ other top platforms**

CoolTools is a comprehensive phone comparison platform that aggregates data from multiple industry-leading sources to help you make informed decisions when choosing your next smartphone. With over 10,000 phones in our database and 7+ years of historical data, we provide the most detailed phone comparisons available.

## ✨ Features

### 🔍 Advanced Search & Discovery
- **150+ Filters**: Search phones by specs, features, price range, release date, and more
- **Smart Phone Finder**: AI-powered recommendations based on your preferences
- **Top Trending Phones**: Stay updated with the most popular devices
- **Latest Releases**: Browse newly announced and released phones

### 📊 Detailed Comparisons
- **Side-by-Side Analysis**: Compare up to 4 phones simultaneously
- **Comprehensive Spec Breakdown**: View detailed technical specifications
- **Visual Comparisons**: Easy-to-read comparison charts and graphs
- **Performance Metrics**: Real-world benchmark scores

### 🎯 Performance Benchmarks
- **AnTuTu Scores**: Overall performance ratings
- **Camera Testing**: DXOMARK camera quality scores
- **Display Analysis**: Color accuracy, brightness, and touch responsiveness
- **Battery Life**: Real-world battery performance data
- **Audio Quality**: Speaker and headphone audio ratings
- **Build Quality**: Materials and durability analysis

### 💰 Price & Deals Tracking
- **Price History**: Track price changes over time
- **Drop Alerts**: Get notifications when prices fall
- **Multi-Retailer Comparison**: Find the best deals across platforms
- **Value Calculator**: Assess value for money based on specs

### 🌐 Network Compatibility
- **Carrier Compatibility Checker**: Verify network support for any phone
- **Band Coverage**: Detailed 2G/3G/4G/5G band information
- **Regional Availability**: Check phone availability by region

### ⭐ Reviews & Ratings
- **Expert Reviews**: Professional reviews from tech journalists
- **User Ratings**: Community-driven feedback and ratings
- **Detailed Analysis**: In-depth breakdowns of pros and cons

## 🛠️ Technology Stack

### Frontend
- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Recharts](https://recharts.org/)** - Data visualization

### Backend & Database
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Axios](https://axios-http.com/)** - HTTP client

### Data Sources
- **GSMArena** - Comprehensive phone specifications
- **Rtings** - Display and performance testing
- **DXOMARK** - Camera quality ratings
- **Mobile Specs API** - Aggregated phone data

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler
- **Geist Font** - Modern typography

## 📁 Project Structure

```
cooltools/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── phones/            # Phone listing pages
│   ├── compare/           # Comparison tool
│   └── search/            # Search functionality
├── lib/                   # Utility functions
│   └── phoneApi.ts        # API client for phone data
├── shared/                # Shared resources
│   └── schema.ts          # Database schema definitions
├── server/                # Server-side code
├── public/                # Static assets
└── drizzle/               # Database migrations
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- **PostgreSQL** database (optional, for full features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VpkDevs/phoneCompare.git
   cd phoneCompare/cooltools
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/phonecompare
   ```

4. **Initialize the database** (optional)
   ```bash
   npm run db:push
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will start on [http://localhost:5000](http://localhost:5000)

> **Note**: This project uses Turbopack for faster development builds.

### Building for Production

```bash
npm run build
npm start
```

### Database Management

```bash
# Push schema changes to database
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## 📊 Database Schema

The application uses a PostgreSQL database with the following main tables:

### Phones Table
Stores comprehensive phone information including:
- Basic info (brand, model, release date, price)
- Display specs (size, resolution, type, refresh rate)
- Performance (chipset, CPU, GPU, RAM, storage)
- Camera specs (main camera, selfie camera, scores)
- Battery (capacity, charging speeds)
- Connectivity (network, Bluetooth, WiFi, NFC)
- Build quality (dimensions, weight, materials, IP rating)

### Reviews Table
User and expert reviews with ratings, pros/cons, and detailed feedback.

### Benchmarks Table
Performance benchmark scores from various testing platforms (AnTuTu, Geekbench, 3DMark, etc.).

## 🔌 API Integration

CoolTools integrates with the [Mobile Specs API](https://github.com/azharimm/phone-specs-api) for phone data:

- `GET /brands` - List all phone brands
- `GET /brands/{slug}` - Get phones by brand
- `GET /latest` - Get latest phone releases
- `GET /top-by-interest` - Get trending phones
- `GET /search?query={query}` - Search phones
- `GET /{slug}` - Get detailed phone specifications

The API client includes:
- In-memory caching (5-minute TTL)
- Request deduplication
- Error handling and retries

## 🎨 Customization

### Styling
- Tailwind CSS configuration in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Dark mode support via `next-themes`

### Fonts
The project uses Geist Sans and Geist Mono fonts, optimized via `next/font`.

## 🧪 Code Quality

### Linting
```bash
npm run lint
```

ESLint is configured with Next.js recommended rules and TypeScript support.

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VpkDevs/phoneCompare)

### Other Platforms

CoolTools can be deployed to any platform that supports Next.js:
- **Netlify**: Use the Next.js adapter
- **AWS Amplify**: Connect your Git repository
- **Docker**: Build a container image
- **Self-hosted**: Use `npm run build && npm start`

### Environment Variables

Required environment variables for deployment:
```env
DATABASE_URL=your_postgresql_connection_string
```

## 📈 Performance Optimization

- **Turbopack**: Ultra-fast bundling in development
- **Image Optimization**: Automatic image optimization via Next.js
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: API response caching for faster load times
- **Font Optimization**: Automatic font loading optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **GSMArena** for comprehensive phone specifications
- **Rtings** for display and performance testing data
- **DXOMARK** for camera quality ratings
- **Mobile Specs API** for aggregated phone data
- All contributors and the open-source community

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/VpkDevs/phoneCompare/issues)
- **Discussions**: [GitHub Discussions](https://github.com/VpkDevs/phoneCompare/discussions)

---

**Made with ❤️ by the VpkDevs team**
