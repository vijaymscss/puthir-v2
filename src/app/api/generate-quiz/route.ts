import { NextRequest, NextResponse } from "next/server";

interface QuizRequest {
  examName: string;
  examLevel: string;
  quizType: string;
  selectedTopics: string[];
  questionCount: number;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
  difficulty: string;
  topic: string;
}

interface ParsedQuestion {
  question?: string;
  options?: string[];
  correctAnswer?: number | number[];
  explanation?: string;
  difficulty?: string;
  topic?: string;
}

// Fallback function to generate sample questions if AI fails
function generateFallbackQuestions(examName: string, topics: string[], count: number): QuizQuestion[] {
  const awsQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which AWS service is primarily used for object storage?",
      options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon Lambda"],
      correctAnswer: 1,
      explanation: "Amazon S3 (Simple Storage Service) is AWS's object storage service that offers industry-leading scalability, data availability, security, and performance.",
      difficulty: "Easy",
      topic: "Storage Services"
    },
    {
      id: 2,
      question: "Which of the following are benefits of cloud computing? (Select all that apply)",
      options: ["Pay-as-you-go pricing", "Global reach", "Increased security risks", "Elasticity"],
      correctAnswer: [0, 1, 3],
      explanation: "Cloud computing benefits include pay-as-you-go pricing, global reach, and elasticity. Cloud computing actually typically increases security rather than creating risks.",
      difficulty: "Medium",
      topic: "Cloud Concepts"
    },
    {
      id: 3,
      question: "What is the AWS Well-Architected Framework principle that focuses on avoiding or eliminating unneeded costs?",
      options: ["Operational Excellence", "Security", "Reliability", "Cost Optimization"],
      correctAnswer: 3,
      explanation: "Cost Optimization is the Well-Architected Framework principle that focuses on avoiding or eliminating unneeded costs or suboptimal resources.",
      difficulty: "Medium",
      topic: "Cost Management"
    },
    {
      id: 4,
      question: "Which AWS service would you use to run serverless functions?",
      options: ["Amazon EC2", "Amazon ECS", "AWS Lambda", "Amazon EKS"],
      correctAnswer: 2,
      explanation: "AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume.",
      difficulty: "Easy",
      topic: "Compute Services"
    },
    {
      id: 5,
      question: "What are the main components of AWS Identity and Access Management (IAM)? (Select all that apply)",
      options: ["Users", "Groups", "Policies", "Regions"],
      correctAnswer: [0, 1, 2],
      explanation: "IAM consists of Users (individual identities), Groups (collections of users), and Policies (documents that define permissions). Regions are not part of IAM.",
      difficulty: "Medium",
      topic: "Security and Identity"
    },
    {
      id: 6,
      question: "Which AWS service provides a managed relational database?",
      options: ["Amazon DynamoDB", "Amazon RDS", "Amazon S3", "Amazon Redshift"],
      correctAnswer: 1,
      explanation: "Amazon RDS (Relational Database Service) provides managed relational databases including MySQL, PostgreSQL, Oracle, SQL Server, and MariaDB.",
      difficulty: "Easy",
      topic: "Database Services"
    },
    {
      id: 7,
      question: "What is the difference between AWS Regions and Availability Zones?",
      options: [
        "Regions are smaller than Availability Zones",
        "Availability Zones are isolated locations within a Region",
        "Regions and Availability Zones are the same thing",
        "Availability Zones are larger than Regions"
      ],
      correctAnswer: 1,
      explanation: "Availability Zones are isolated locations within an AWS Region. Each Region contains multiple Availability Zones for high availability and fault tolerance.",
      difficulty: "Medium",
      topic: "Infrastructure"
    },
    {
      id: 8,
      question: "Which AWS service would you use for content delivery and caching?",
      options: ["Amazon S3", "Amazon CloudFront", "Amazon Route 53", "AWS Direct Connect"],
      correctAnswer: 1,
      explanation: "Amazon CloudFront is a content delivery network (CDN) service that delivers content to users with low latency and high transfer speeds.",
      difficulty: "Easy",
      topic: "Networking"
    },
    {
      id: 9,
      question: "What are the advantages of using Auto Scaling in AWS? (Select all that apply)",
      options: ["Cost optimization", "High availability", "Manual scaling", "Automatic capacity management"],
      correctAnswer: [0, 1, 3],
      explanation: "Auto Scaling provides cost optimization by scaling resources as needed, high availability by maintaining desired capacity, and automatic capacity management. Manual scaling is the opposite of what Auto Scaling provides.",
      difficulty: "Medium",
      topic: "Compute Services"
    },
    {
      id: 10,
      question: "Which AWS service is used for monitoring and observability?",
      options: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Config", "AWS Systems Manager"],
      correctAnswer: 1,
      explanation: "Amazon CloudWatch is the primary monitoring service that collects and tracks metrics, collects and monitors log files, and sets alarms.",
      difficulty: "Easy",
      topic: "Monitoring"
    }
  ];

  // Return the requested number of questions, cycling through if needed
  const questions: QuizQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const baseQuestion = awsQuestions[i % awsQuestions.length];
    questions.push({
      ...baseQuestion,
      id: i + 1,
      topic: topics.length > 0 ? topics[i % topics.length] : baseQuestion.topic
    });
  }

  return questions;
}

export async function POST(request: NextRequest) {
  
  try {
    const body: QuizRequest = await request.json();
    const { examName, examLevel, quizType, selectedTopics, questionCount } = body;

    // Validate required fields
    if (!examName || !examLevel || !selectedTopics || !questionCount) {
      console.error("❌ Missing required fields:", { examName, examLevel, selectedTopics, questionCount });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Try to generate questions using Gemini AI
    
    try {
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (!geminiApiKey) {
        throw new Error("Gemini API key not found");
      }

      // Create the prompt for Gemini
      const prompt = `Create ${questionCount} mock multiple-choice questions for the ${examName} certification exam at the ${examLevel} level.

    Emphasize the following topics: ${selectedTopics.join(", ")}.

    Ensure that:
    - 50% of the questions are scenario-based or practical, reflecting real-world use cases.
    - The remaining 50% are conceptual or theoretical.

    For each question, include:
    1. A clear, exam-relevant question
    2. Four answer options WITHOUT letter prefixes (A, B, C, D) - just the text content
    3. The correct answer index (0–3)
    4. A detailed explanation of the correct answer
    5. A difficulty rating (Easy, Medium, or Hard)
    6. The associated topic category
      
      Some questions should be multiple-choice (single answer) and some should allow multiple correct answers.
      
      Return the response as a JSON array with this exact structure:
      [
        {
          "id": 1,
          "question": "Question text here?",
          "options": ["First option text", "Second option text", "Third option text", "Fourth option text"],
          "correctAnswer": 0,
          "explanation": "Detailed explanation here",
          "difficulty": "Medium",
          "topic": "Topic Name"
        }
      ]
      
      For multiple-answer questions, use an array for correctAnswer like [0, 2] for options A and C.
      Make the questions realistic and exam-appropriate for ${examName}.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        // Try to get more details about the error
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error("Invalid response structure from Gemini");
      }

      const generatedText = data.candidates[0].content.parts[0].text;

      // Parse the JSON from the generated text
      let questionsJson;
      try {
        // Extract JSON from the response (remove any markdown formatting)
        const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
          throw new Error("No JSON array found in response");
        }
        questionsJson = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error("❌ Failed to parse Gemini response as JSON:", parseError);
        throw new Error("Failed to parse AI response");
      }

      // Validate and format the questions
      const aiQuestions: QuizQuestion[] = questionsJson.map((q: ParsedQuestion, index: number) => ({
        id: index + 1,
        question: q.question || `Question ${index + 1}`,
        options: Array.isArray(q.options) ? q.options : ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: q.correctAnswer !== undefined ? q.correctAnswer : 0,
        explanation: q.explanation || "No explanation provided",
        difficulty: q.difficulty || "Medium",
        topic: q.topic || selectedTopics[0] || "General"
      }));

      const response_data = {
        questions: aiQuestions,
        examInfo: {
          name: examName,
          type: quizType === "complete" ? "Complete Quiz" : "Custom Quiz",
          totalQuestions: questionCount,
        },
      };

      return NextResponse.json(response_data);

    } catch (aiError) {
      console.error("🤖 Gemini AI generation failed:", aiError);
      
      // Fallback to predefined questions if AI fails
      const fallbackQuestions = generateFallbackQuestions(examName, selectedTopics, questionCount);
      
      const response = {
        questions: fallbackQuestions,
        examInfo: {
          name: examName,
          type: quizType === "complete" ? "Complete Quiz" : "Custom Quiz",
          totalQuestions: questionCount,
        },
      };

      return NextResponse.json(response);
    }

  } catch (error) {
    console.error("💥 Quiz generation error:", error);
    
    // Emergency fallback if everything fails
    const emergencyQuestions = generateFallbackQuestions("AWS Quiz", ["General"], 10);
    return NextResponse.json({
      questions: emergencyQuestions,
      examInfo: {
        name: "AWS Quiz",
        type: "Fallback Quiz",
        totalQuestions: 10,
      },
    });
  }
}