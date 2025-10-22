# AWS Quiz Application

A comprehensive AWS certification quiz application built with Next.js, featuring AI-generated questions powered by Google's Gemini AI.

## Features

- 🎯 **Multiple AWS Certifications**: Cloud Practitioner, Developer Associate, Solutions Architect Associate
- 🤖 **AI-Generated Questions**: Powered by Google Gemini AI for realistic, up-to-date questions
- 📚 **Topic Selection**: Choose specific topics or take complete certification exams
- 💡 **Interactive UI**: Modern interface with smooth animations and responsive design
- 📊 **Progress Tracking**: Real-time progress and detailed result analysis
- 🎨 **Dark/Light Mode**: Built with Tailwind CSS and shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd aws-quiz
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Get your Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env.local` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/generate-quiz/     # AI quiz generation endpoint
│   ├── exam/[examId]/         # Exam details and topic selection
│   ├── instructions/          # Quiz instructions page
│   ├── quiz/                  # Main quiz interface
│   └── quiz-setup/            # Quiz configuration flow
├── components/
│   ├── app/                   # Custom app components
│   └── ui/                    # shadcn/ui components
└── utils/
    └── constants.ts           # AWS exam data and configurations
```

## Usage

1. **Select Platform**: Choose AWS (Azure and GCP coming soon)
2. **Choose Exam**: Pick from available AWS certifications
3. **Customize Quiz**: Select complete exam or choose specific topics
4. **Read Instructions**: Review quiz format and guidelines
5. **Take Quiz**: Answer AI-generated questions with real-time feedback
6. **View Results**: Get detailed performance analysis and recommendations

## Technologies Used

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **AI**: Google Gemini AI for question generation
- **State Management**: React Hooks
- **Routing**: Next.js App Router

## API Endpoints

- `POST /api/generate-quiz` - Generates quiz questions using Gemini AI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
