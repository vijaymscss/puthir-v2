// AWS exam topics organized with their respective exam types and categories
export const examTopics = [
  {
    id: "aws",
    name: "AWS (Amazon Web Services)",
    description: "Comprehensive AWS cloud computing certification and skill development",
    icon: "☁️",
    examTypes: [
      {
        id: "cloud-practitioner",
        name: "AWS Cloud Practitioner",
        level: "Foundational",
        description: "Foundational understanding of AWS Cloud concepts, services, and terminology",
        duration: "90 minutes",
        questionCount: "65 questions (50 scored, 15 unscored)",
        examCode: "CLF-C02",
        passingScore: 700,
        categories: [
          "Cloud Concepts (24%)",
          "Security and Compliance (30%)", 
          "Cloud Technology and Services (34%)",
          "Billing, Pricing, and Support (12%)"
        ],
        detailedSyllabus: [
          {
            domain: "Cloud Concepts (24%)",
            topics: [
              "Define the benefits of the AWS Cloud",
              "Identify design principles of the AWS Cloud",
              "Understand the benefits of and strategies for migration to the AWS Cloud",
              "Understand concepts related to AWS Cloud economics"
            ]
          },
          {
            domain: "Security and Compliance (30%)",
            topics: [
              "Understand the AWS shared responsibility model",
              "Understand AWS Cloud security, governance, and compliance concepts",
              "Identify AWS access management capabilities",
              "Identify components and resources for security"
            ]
          },
          {
            domain: "Cloud Technology and Services (34%)",
            topics: [
              "Define methods of deploying and operating in the AWS Cloud",
              "Define the AWS global infrastructure",
              "Identify AWS compute services",
              "Identify AWS database services",
              "Identify AWS network services",
              "Identify AWS storage services",
              "Identify AWS artificial intelligence and machine learning (AI/ML) services"
            ]
          },
          {
            domain: "Billing, Pricing, and Support (12%)",
            topics: [
              "Compare AWS pricing models",
              "Understand resources for billing, budget, and cost management",
              "Identify AWS technical resources and AWS Support options"
            ]
          }
        ]
      },
      {
        id: "developer-associate",
        name: "AWS Developer Associate",
        level: "Associate",
        description: "Demonstrates expertise in developing, deploying, and debugging cloud-based applications using AWS",
        duration: "130 minutes",
        questionCount: "65 questions (50 scored, 15 unscored)",
        examCode: "DVA-C02",
        passingScore: 720,
        categories: [
          "Development with AWS Services (32%)",
          "Security (26%)",
          "Deployment (24%)",
          "Troubleshooting and Optimization (18%)"
        ],
        detailedSyllabus: [
          {
            domain: "Development with AWS Services (32%)",
            topics: [
              "Develop code for applications hosted on AWS",
              "Develop code for AWS Lambda",
              "Use data stores in application development"
            ]
          },
          {
            domain: "Security (26%)",
            topics: [
              "Implement authentication and/or authorization for applications and AWS services",
              "Implement encryption using AWS services",
              "Manage sensitive data in application code"
            ]
          },
          {
            domain: "Deployment (24%)",
            topics: [
              "Prepare application artifacts to be deployed to AWS",
              "Test applications in development environments",
              "Automate deployment testing"
            ]
          },
          {
            domain: "Troubleshooting and Optimization (18%)",
            topics: [
              "Assist in a root cause analysis",
              "Instrument code for observability",
              "Optimize applications by using AWS services and features"
            ]
          }
        ]
      },
      {
        id: "solutions-architect-associate",
        name: "AWS Solutions Architect Associate",
        level: "Associate", 
        description: "Demonstrates skills in designing distributed systems and applications on the AWS platform",
        duration: "130 minutes",
        questionCount: "65 questions (50 scored, 15 unscored)",
        examCode: "SAA-C03",
        passingScore: 720,
        categories: [
          "Design Secure Architectures (30%)",
          "Design Resilient Architectures (26%)",
          "Design High-Performing Architectures (24%)",
          "Design Cost-Optimized Architectures (20%)"
        ],
        detailedSyllabus: [
          {
            domain: "Design Secure Architectures (30%)",
            topics: [
              "Design secure access to AWS resources",
              "Design secure workloads and applications",
              "Determine appropriate data security controls"
            ]
          },
          {
            domain: "Design Resilient Architectures (26%)",
            topics: [
              "Design scalable and loosely coupled architectures",
              "Design highly available and/or fault-tolerant architectures"
            ]
          },
          {
            domain: "Design High-Performing Architectures (24%)",
            topics: [
              "Determine high-performing and/or scalable storage solutions",
              "Design high-performing and elastic compute solutions",
              "Determine high-performing database solutions",
              "Determine high-performing and/or scalable network architectures"
            ]
          },
          {
            domain: "Design Cost-Optimized Architectures (20%)",
            topics: [
              "Design cost-optimized storage solutions",
              "Design cost-optimized compute solutions"
            ]
          }
        ]
      },
      {
        id: "data-engineer-associate",
        name: "AWS Data Engineer Associate",
        level: "Associate",
        description: "Demonstrates expertise in designing, implementing, and maintaining data engineering solutions on AWS",
        duration: "170 minutes",
        questionCount: "85 questions (65 scored, 20 unscored)",
        examCode: "DEA-C01",
        passingScore: 720,
        categories: [
          "Data Ingestion and Transformation (34%)",
          "Data Store Management (26%)",
          "Data Operations and Support (22%)",
          "Data Security and Governance (18%)"
        ],
        detailedSyllabus: [
          {
            domain: "Data Ingestion and Transformation (34%)",
            topics: [
              "Implement data ingestion solutions",
              "Transform and process data",
              "Orchestrate data pipelines"
            ]
          },
          {
            domain: "Data Store Management (26%)",
            topics: [
              "Choose appropriate data stores",
              "Understand data cataloging systems",
              "Manage data lifecycle"
            ]
          },
          {
            domain: "Data Operations and Support (22%)",
            topics: [
              "Automate data processing systems",
              "Monitor and troubleshoot data pipelines",
              "Optimize cost and performance"
            ]
          },
          {
            domain: "Data Security and Governance (18%)",
            topics: [
              "Apply authentication and authorization",
              "Ensure data encryption and privacy",
              "Implement monitoring and auditing"
            ]
          }
        ]
      }
    ]
  }
];