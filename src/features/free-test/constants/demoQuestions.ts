/**
 * Demo Questions for Free Test
 * 
 * 20 sample questions for each AWS certification
 * Organized by certification with proper topics matching examTopicMappings
 */

export interface DemoQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: string;
  topic: string;
}

export interface DemoCertification {
  id: string;
  name: string;
  level: string;
  categories: string[];
  questions: DemoQuestion[];
}

export interface DemoPlatform {
  id: string;
  name: string;
  icon: string;
  certifications: DemoCertification[];
}

export const demoQuestions: DemoPlatform[] = [
  {
    id: "aws",
    name: "Amazon Web Services",
    icon: "/aws_logo.svg",
    certifications: [
      {
        id: "cloud-practitioner",
        name: "AWS Certified Cloud Practitioner",
        level: "Foundational",
        categories: [
          "Cloud Concepts (24%)",
          "Security and Compliance (30%)",
          "Cloud Technology and Services (34%)",
          "Billing, Pricing, and Support (12%)"
        ],
        questions: [
          {
            id: "aws-cp-1",
            question: "Which benefit of cloud computing allows you to pay only for the resources you use?",
            options: [
              "Economies of scale",
              "Variable expense model",
              "Global reach",
              "High availability"
            ],
            correctAnswer: 1,
            explanation: "Cloud computing uses a variable expense model where you pay only for the compute resources you consume, rather than investing in fixed infrastructure upfront. This is one of the core economic advantages of cloud computing.",
            category: "Cloud Concepts (24%)",
            difficulty: "Easy",
            topic: "Cloud Economics"
          },
          {
            id: "aws-cp-2",
            question: "What does elasticity in cloud computing refer to?",
            options: [
              "The ability to automatically scale resources up or down based on demand",
              "The physical flexibility of data center infrastructure",
              "The capability to withstand failures",
              "The option to choose different pricing models"
            ],
            correctAnswer: 0,
            explanation: "Elasticity is the ability to automatically acquire and release resources to match changing demand. This ensures you have the right amount of resources at any given time without over-provisioning or under-provisioning.",
            category: "Cloud Concepts (24%)",
            difficulty: "Medium",
            topic: "Cloud Benefits"
          },
          {
            id: "aws-cp-3",
            question: "Which pillar of the AWS Well-Architected Framework focuses on using computing resources efficiently to meet requirements?",
            options: [
              "Operational Excellence",
              "Security",
              "Performance Efficiency",
              "Cost Optimization"
            ],
            correctAnswer: 2,
            explanation: "The Performance Efficiency pillar focuses on using computing resources efficiently to meet system requirements and maintaining that efficiency as demand changes and technologies evolve.",
            category: "Cloud Concepts (24%)",
            difficulty: "Medium",
            topic: "Design Principles"
          },
          {
            id: "aws-cp-4",
            question: "What is the primary benefit of using multiple Availability Zones in AWS?",
            options: [
              "Reduced costs",
              "Improved security",
              "High availability and fault tolerance",
              "Faster data transfer speeds"
            ],
            correctAnswer: 2,
            explanation: "Using multiple Availability Zones provides high availability and fault tolerance by allowing applications to remain available even if one AZ experiences issues. Each AZ is isolated with independent power, cooling, and networking.",
            category: "Cloud Concepts (24%)",
            difficulty: "Easy",
            topic: "Global Infrastructure"
          },
          {
            id: "aws-cp-5",
            question: "According to the AWS Shared Responsibility Model, which of the following is AWS responsible for?",
            options: [
              "Customer data encryption",
              "Physical security of data centers",
              "Identity and Access Management configuration",
              "Operating system patches on EC2 instances"
            ],
            correctAnswer: 1,
            explanation: "AWS is responsible for security 'of' the cloud, including physical security of data centers, hardware, and infrastructure. Customers are responsible for security 'in' the cloud, including data, IAM, and application-level security.",
            category: "Security and Compliance (30%)",
            difficulty: "Easy",
            topic: "Shared Responsibility Model"
          },
          {
            id: "aws-cp-6",
            question: "Which AWS service helps you find and download AWS compliance reports and agreements?",
            options: [
              "AWS Config",
              "AWS Artifact",
              "AWS CloudTrail",
              "AWS Audit Manager"
            ],
            correctAnswer: 1,
            explanation: "AWS Artifact is a self-service portal for on-demand access to AWS compliance reports and select online agreements. It provides documents like SOC reports, PCI reports, and certifications.",
            category: "Security and Compliance (30%)",
            difficulty: "Medium",
            topic: "Security Governance & Compliance"
          },
          {
            id: "aws-cp-7",
            question: "What is the principle of least privilege in IAM?",
            options: [
              "Giving users the maximum permissions they might ever need",
              "Granting only the permissions required to perform a task",
              "Allowing all users read-only access by default",
              "Restricting access to the root user only"
            ],
            correctAnswer: 1,
            explanation: "The principle of least privilege means granting only the permissions necessary to perform a specific task. This minimizes security risks by ensuring users and services have only the access they need.",
            category: "Security and Compliance (30%)",
            difficulty: "Easy",
            topic: "Access Management"
          },
          {
            id: "aws-cp-8",
            question: "Which AWS service provides threat detection by analyzing CloudTrail logs, VPC Flow Logs, and DNS logs?",
            options: [
              "AWS Shield",
              "Amazon Inspector",
              "Amazon GuardDuty",
              "AWS WAF"
            ],
            correctAnswer: 2,
            explanation: "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior by analyzing CloudTrail logs, VPC Flow Logs, and DNS logs using machine learning.",
            category: "Security and Compliance (30%)",
            difficulty: "Medium",
            topic: "Security Resources"
          },
          {
            id: "aws-cp-9",
            question: "Which service should you use to enable Multi-Factor Authentication (MFA) for your AWS root user?",
            options: [
              "AWS Secrets Manager",
              "AWS IAM",
              "AWS Organizations",
              "AWS Single Sign-On"
            ],
            correctAnswer: 1,
            explanation: "AWS IAM (Identity and Access Management) is used to enable MFA for the root user and IAM users. MFA adds an extra layer of security by requiring a second form of authentication beyond just a password.",
            category: "Security and Compliance (30%)",
            difficulty: "Easy",
            topic: "Access Management"
          },
          {
            id: "aws-cp-10",
            question: "Which AWS compute service automatically manages the infrastructure for your serverless applications?",
            options: [
              "Amazon EC2",
              "AWS Lambda",
              "Amazon ECS",
              "AWS Elastic Beanstalk"
            ],
            correctAnswer: 1,
            explanation: "AWS Lambda is a serverless compute service that runs code in response to events and automatically manages the compute resources. You don't need to provision or manage servers.",
            category: "Cloud Technology and Services (34%)",
            difficulty: "Easy",
            topic: "Compute Services"
          },
          {
            id: "aws-cp-11",
            question: "What is the primary use case for Amazon S3?",
            options: [
              "Running relational databases",
              "Hosting serverless functions",
              "Object storage for files and backups",
              "Processing streaming data"
            ],
            correctAnswer: 2,
            explanation: "Amazon S3 (Simple Storage Service) is an object storage service designed for storing and retrieving any amount of data including files, backups, archives, and static website content.",
            category: "Cloud Technology and Services (34%)",
            difficulty: "Easy",
            topic: "Storage Services"
          },
          {
            id: "aws-cp-12",
            question: "Which AWS service provides a fully managed relational database that is compatible with MySQL and PostgreSQL?",
            options: [
              "Amazon DynamoDB",
              "Amazon RDS",
              "Amazon Redshift",
              "Amazon DocumentDB"
            ],
            correctAnswer: 1,
            explanation: "Amazon RDS (Relational Database Service) is a managed service that makes it easy to set up, operate, and scale relational databases including MySQL, PostgreSQL, Oracle, SQL Server, and MariaDB.",
            category: "Cloud Technology and Services (34%)",
            difficulty: "Easy",
            topic: "Database Services"
          },
          {
            id: "aws-cp-13",
            question: "Which service distributes incoming application traffic across multiple targets such as EC2 instances?",
            options: [
              "Amazon CloudFront",
              "AWS Auto Scaling",
              "Elastic Load Balancing",
              "Amazon Route 53"
            ],
            correctAnswer: 2,
            explanation: "Elastic Load Balancing automatically distributes incoming application traffic across multiple targets (EC2 instances, containers, IP addresses) in multiple Availability Zones, increasing fault tolerance.",
            category: "Cloud Technology and Services (34%)",
            difficulty: "Medium",
            topic: "Compute Services"
          },
          {
            id: "aws-cp-14",
            question: "What is Amazon CloudFront?",
            options: [
              "A domain name system (DNS) service",
              "A content delivery network (CDN) service",
              "A load balancing service",
              "A virtual private cloud service"
            ],
            correctAnswer: 1,
            explanation: "Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds.",
            category: "Cloud Technology and Services (34%)",
            difficulty: "Easy",
            topic: "Networking Services"
          },
          {
            id: "aws-cp-15",
            question: "Which AWS service provides a virtual network where you can launch AWS resources in a logically isolated section?",
            options: [
              "AWS Direct Connect",
              "Amazon VPC",
              "AWS Transit Gateway",
              "Amazon Route 53"
            ],
            correctAnswer: 1,
            explanation: "Amazon VPC (Virtual Private Cloud) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define with complete control over your networking environment.",
            category: "Cloud Technology and Services (34%)",
            difficulty: "Easy",
            topic: "Networking Services"
          },
          {
            id: "aws-cp-16",
            question: "Which AWS pricing model requires a commitment of usage for 1 or 3 years in exchange for a significant discount?",
            options: [
              "On-Demand Instances",
              "Spot Instances",
              "Reserved Instances",
              "Dedicated Hosts"
            ],
            correctAnswer: 2,
            explanation: "Reserved Instances provide a significant discount (up to 75%) compared to On-Demand pricing in exchange for a commitment to use a specific instance type in a particular region for a 1 or 3-year term.",
            category: "Billing, Pricing, and Support (12%)",
            difficulty: "Easy",
            topic: "Pricing Models"
          },
          {
            id: "aws-cp-17",
            question: "Which AWS service helps you visualize, understand, and manage your AWS costs and usage over time?",
            options: [
              "AWS Budgets",
              "AWS Cost Explorer",
              "AWS Pricing Calculator",
              "AWS Cost and Usage Report"
            ],
            correctAnswer: 1,
            explanation: "AWS Cost Explorer provides visualizations and analysis tools to help you understand your AWS spending patterns over time. You can view costs by service, linked account, tag, and more with customizable time ranges.",
            category: "Billing, Pricing, and Support (12%)",
            difficulty: "Easy",
            topic: "Billing and Cost Management"
          },
          {
            id: "aws-cp-18",
            question: "Which AWS Support plan provides access to AWS Trusted Advisor checks for cost optimization, security, fault tolerance, and performance?",
            options: [
              "Basic Support (all checks)",
              "Developer Support (limited checks)",
              "Business Support (full checks)",
              "Enterprise Support (full checks with TAM)"
            ],
            correctAnswer: 2,
            explanation: "Business and Enterprise Support plans provide access to the full set of AWS Trusted Advisor checks. Basic and Developer plans have access to only 7 core checks. Business Support unlocks all checks for cost optimization, security, fault tolerance, performance, and service limits.",
            category: "Billing, Pricing, and Support (12%)",
            difficulty: "Medium",
            topic: "Support and Resources"
          },
          {
            id: "aws-cp-19",
            question: "What is the purpose of AWS Organizations?",
            options: [
              "To monitor application performance",
              "To centrally manage and govern multiple AWS accounts",
              "To deploy applications automatically",
              "To analyze security threats"
            ],
            correctAnswer: 1,
            explanation: "AWS Organizations helps you centrally manage and govern your environment as you scale your AWS resources. You can create groups of accounts, apply policies, and manage billing across multiple accounts.",
            category: "Security and Compliance (30%)",
            difficulty: "Medium",
            topic: "Security Governance & Compliance"
          },
          {
            id: "aws-cp-20",
            question: "Which AWS service uses machine learning to discover, classify, and protect sensitive data stored in S3?",
            options: [
              "Amazon Inspector",
              "AWS Shield",
              "Amazon Macie",
              "AWS GuardDuty"
            ],
            correctAnswer: 2,
            explanation: "Amazon Macie is a data security service that uses machine learning to automatically discover, classify, and protect sensitive data in AWS, particularly in Amazon S3. It helps identify PII, financial data, and other sensitive information.",
            category: "Security and Compliance (30%)",
            difficulty: "Medium",
            topic: "Security Resources"
          }
        ]
      },
      {
        id: "developer-associate",
        name: "AWS Developer Associate",
        level: "Associate",
        categories: [
          "Development with AWS Services (32%)",
          "Security (26%)",
          "Deployment (24%)",
          "Troubleshooting and Optimization (18%)"
        ],
        questions: [
          {
            id: "aws-dev-1",
            question: "Which AWS SDK method should you use to make asynchronous calls to AWS services in Node.js?",
            options: [
              "Using .promise() on the request",
              "Using callbacks only",
              "Using synchronous methods",
              "Using polling"
            ],
            correctAnswer: 0,
            explanation: "In the AWS SDK for Node.js, you can make asynchronous calls using .promise() on requests, which returns a Promise. This allows you to use async/await or .then()/.catch() patterns for cleaner asynchronous code.",
            category: "Development with AWS Services (32%)",
            difficulty: "Medium",
            topic: "Application Development"
          },
          {
            id: "aws-dev-2",
            question: "What is the maximum execution time for an AWS Lambda function?",
            options: [
              "5 minutes",
              "10 minutes",
              "15 minutes",
              "30 minutes"
            ],
            correctAnswer: 2,
            explanation: "AWS Lambda functions have a maximum execution timeout of 15 minutes (900 seconds). If your function needs to run longer, you should consider using other services like ECS, Fargate, or EC2.",
            category: "Development with AWS Services (32%)",
            difficulty: "Easy",
            topic: "AWS Lambda Development"
          },
          {
            id: "aws-dev-3",
            question: "Which DynamoDB operation retrieves multiple items in a single request using their primary keys?",
            options: [
              "Query",
              "Scan",
              "BatchGetItem",
              "GetItem"
            ],
            correctAnswer: 2,
            explanation: "BatchGetItem retrieves multiple items from one or more tables using their primary keys. It's more efficient than making multiple GetItem calls as it reduces the number of API requests and round trips.",
            category: "Development with AWS Services (32%)",
            difficulty: "Medium",
            topic: "Data Store Integration"
          },
          {
            id: "aws-dev-4",
            question: "When creating a REST API with API Gateway, which integration type passes the entire request to a Lambda function?",
            options: [
              "Lambda Proxy Integration",
              "Lambda Custom Integration",
              "HTTP Integration",
              "AWS Service Integration"
            ],
            correctAnswer: 0,
            explanation: "Lambda Proxy Integration passes the entire client request to the Lambda function, including headers, query strings, and body. The function is responsible for parsing the request and formatting the response.",
            category: "Development with AWS Services (32%)",
            difficulty: "Medium",
            topic: "Application Development"
          },
          {
            id: "aws-dev-5",
            question: "Which environment variable contains the AWS region where your Lambda function is running?",
            options: [
              "AWS_DEFAULT_REGION",
              "AWS_REGION",
              "LAMBDA_REGION",
              "REGION"
            ],
            correctAnswer: 1,
            explanation: "AWS_REGION is the environment variable that contains the AWS region where the Lambda function is executed. This is automatically set by the Lambda runtime environment.",
            category: "Development with AWS Services (32%)",
            difficulty: "Easy",
            topic: "AWS Lambda Development"
          },
          {
            id: "aws-dev-6",
            question: "What is the recommended way to grant permissions to an EC2 instance to access other AWS services?",
            options: [
              "Store AWS credentials in the application code",
              "Use IAM roles attached to the EC2 instance",
              "Use access keys stored in environment variables",
              "Use the root account credentials"
            ],
            correctAnswer: 1,
            explanation: "The recommended and most secure way is to attach an IAM role to the EC2 instance. This provides temporary credentials that are automatically rotated and eliminates the need to manage and store long-term credentials.",
            category: "Security (26%)",
            difficulty: "Easy",
            topic: "Authentication & Authorization"
          },
          {
            id: "aws-dev-7",
            question: "Which AWS service should you use to store database connection strings and API keys for your application?",
            options: [
              "Amazon S3",
              "AWS Systems Manager Parameter Store",
              "Amazon DynamoDB",
              "AWS CloudFormation"
            ],
            correctAnswer: 1,
            explanation: "AWS Systems Manager Parameter Store provides secure, hierarchical storage for configuration data and secrets management. It integrates with AWS KMS for encryption and is designed for storing sensitive configuration like connection strings and API keys.",
            category: "Security (26%)",
            difficulty: "Easy",
            topic: "Sensitive Data Handling"
          },
          {
            id: "aws-dev-8",
            question: "What type of KMS key should you use if you need to import your own key material?",
            options: [
              "AWS managed key",
              "Customer managed key with AWS key material",
              "Customer managed key with imported key material",
              "Default key"
            ],
            correctAnswer: 2,
            explanation: "Customer managed keys with imported key material allow you to create a KMS key and import your own cryptographic key material. This gives you control over the key material while leveraging KMS for key management operations.",
            category: "Security (26%)",
            difficulty: "Medium",
            topic: "Encryption"
          },
          {
            id: "aws-dev-9",
            question: "Which feature of AWS Secrets Manager automatically rotates credentials for supported AWS services?",
            options: [
              "Manual rotation",
              "Automatic rotation",
              "Scheduled rotation",
              "Event-driven rotation"
            ],
            correctAnswer: 1,
            explanation: "AWS Secrets Manager supports automatic rotation of credentials for supported AWS databases (RDS, DocumentDB, Redshift). It uses Lambda functions to safely rotate credentials without breaking existing connections.",
            category: "Security (26%)",
            difficulty: "Medium",
            topic: "Sensitive Data Handling"
          },
          {
            id: "aws-dev-10",
            question: "What is the purpose of the buildspec.yml file in AWS CodeBuild?",
            options: [
              "To define deployment stages",
              "To specify build commands and settings",
              "To configure source control integration",
              "To manage IAM permissions"
            ],
            correctAnswer: 1,
            explanation: "The buildspec.yml file is a collection of build commands and settings that CodeBuild uses to run a build. It includes phases like install, pre_build, build, and post_build, along with artifacts and environment configurations.",
            category: "Deployment (24%)",
            difficulty: "Easy",
            topic: "Testing and Automation"
          },
          {
            id: "aws-dev-11",
            question: "Which AWS CodeDeploy deployment configuration deploys to one instance at a time?",
            options: [
              "AllAtOnce",
              "HalfAtATime",
              "OneAtATime",
              "Sequential"
            ],
            correctAnswer: 2,
            explanation: "CodeDeployDefault.OneAtATime is a predefined deployment configuration that deploys the application revision to one instance at a time. This minimizes impact during deployment but takes longer for large fleets.",
            category: "Deployment (24%)",
            difficulty: "Easy",
            topic: "Application Deployment"
          },
          {
            id: "aws-dev-12",
            question: "In AWS SAM, what does the 'sam build' command do?",
            options: [
              "Deploys the application to AWS",
              "Creates the CloudFormation stack",
              "Prepares application artifacts for deployment",
              "Validates the SAM template"
            ],
            correctAnswer: 2,
            explanation: "The 'sam build' command processes your AWS SAM template file, application code, and dependencies, and prepares them for deployment. It creates a .aws-sam directory with built artifacts ready to be packaged and deployed.",
            category: "Deployment (24%)",
            difficulty: "Medium",
            topic: "Application Deployment"
          },
          {
            id: "aws-dev-13",
            question: "Which deployment strategy routes traffic to the new version gradually while monitoring key metrics?",
            options: [
              "All-at-once",
              "Blue/green",
              "Canary",
              "Rolling"
            ],
            correctAnswer: 2,
            explanation: "Canary deployment gradually shifts traffic to the new version (e.g., 10% for 5 minutes, then 100%) while monitoring metrics. If issues are detected, traffic can be quickly rolled back to the stable version.",
            category: "Deployment (24%)",
            difficulty: "Medium",
            topic: "Application Deployment"
          },
          {
            id: "aws-dev-14",
            question: "What does AWS CodePipeline use to represent each stage of your continuous delivery workflow?",
            options: [
              "Actions",
              "Stages",
              "Transitions",
              "Artifacts"
            ],
            correctAnswer: 1,
            explanation: "CodePipeline uses stages to represent each phase of your release process (e.g., Source, Build, Test, Deploy). Each stage contains one or more actions that are performed on artifacts.",
            category: "Deployment (24%)",
            difficulty: "Easy",
            topic: "CI/CD Pipelines"
          },
          {
            id: "aws-dev-15",
            question: "Which CloudWatch Logs feature allows you to extract metrics from log data?",
            options: [
              "Log Streams",
              "Log Groups",
              "Metric Filters",
              "Log Insights"
            ],
            correctAnswer: 2,
            explanation: "Metric Filters extract metric observations from ingested log events and transform them into CloudWatch metrics. This allows you to create alarms and dashboards based on patterns found in your logs.",
            category: "Troubleshooting and Optimization (18%)",
            difficulty: "Medium",
            topic: "Code Instrumentation"
          },
          {
            id: "aws-dev-16",
            question: "What does AWS X-Ray primarily help you do?",
            options: [
              "Monitor application costs",
              "Analyze and debug distributed applications",
              "Manage application deployments",
              "Configure application security"
            ],
            correctAnswer: 1,
            explanation: "AWS X-Ray helps you analyze and debug distributed applications by providing an end-to-end view of requests as they travel through your application. It shows a map of your application's components and helps identify performance bottlenecks.",
            category: "Troubleshooting and Optimization (18%)",
            difficulty: "Easy",
            topic: "Code Instrumentation"
          },
          {
            id: "aws-dev-17",
            question: "Which X-Ray concept represents a single request as it travels through your application?",
            options: [
              "Segment",
              "Trace",
              "Subsegment",
              "Annotation"
            ],
            correctAnswer: 1,
            explanation: "A trace in X-Ray collects all segments generated by a single request. It provides an end-to-end view of the request as it travels through your application's services and resources.",
            category: "Troubleshooting and Optimization (18%)",
            difficulty: "Medium",
            topic: "Code Instrumentation"
          },
          {
            id: "aws-dev-18",
            question: "What is the benefit of using ElastiCache in front of a database?",
            options: [
              "Increases database storage capacity",
              "Reduces database query latency by caching results",
              "Provides automatic database backups",
              "Improves database write performance"
            ],
            correctAnswer: 1,
            explanation: "ElastiCache improves application performance by storing frequently accessed data in memory, reducing the load on the database and significantly decreasing query response times from milliseconds to microseconds.",
            category: "Troubleshooting and Optimization (18%)",
            difficulty: "Easy",
            topic: "Performance Optimization"
          },
          {
            id: "aws-dev-19",
            question: "Which DynamoDB feature allows you to run queries on non-primary key attributes efficiently?",
            options: [
              "Scan operations",
              "Global Secondary Index",
              "Table partitioning",
              "Strongly consistent reads"
            ],
            correctAnswer: 1,
            explanation: "Global Secondary Indexes (GSI) allow you to query DynamoDB tables using non-primary key attributes efficiently. A GSI has its own partition key and optional sort key, enabling flexible query patterns.",
            category: "Troubleshooting and Optimization (18%)",
            difficulty: "Medium",
            topic: "Performance Optimization"
          },
          {
            id: "aws-dev-20",
            question: "When debugging a Lambda function, where can you find the function's log output?",
            options: [
              "AWS CloudTrail",
              "Amazon CloudWatch Logs",
              "AWS X-Ray",
              "AWS Config"
            ],
            correctAnswer: 1,
            explanation: "Lambda automatically integrates with CloudWatch Logs and creates a log group for each function. All console.log() statements and runtime errors are captured in CloudWatch Logs for debugging purposes.",
            category: "Troubleshooting and Optimization (18%)",
            difficulty: "Easy",
            topic: "Root Cause Analysis"
          }
        ]
      },
      {
        id: "solutions-architect-associate",
        name: "AWS Solutions Architect Associate",
        level: "Associate",
        categories: [
          "Design Secure Architectures (30%)",
          "Design Resilient Architectures (26%)",
          "Design High-Performing Architectures (24%)",
          "Design Cost-Optimized Architectures (20%)"
        ],
        questions: [
          {
            id: "aws-saa-1",
            question: "A company wants to restrict access to an S3 bucket to specific AWS accounts. Which feature should they use?",
            options: [
              "IAM policies",
              "S3 bucket policies",
              "Access Control Lists (ACLs)",
              "AWS Organizations SCPs"
            ],
            correctAnswer: 1,
            explanation: "S3 bucket policies are resource-based policies that can grant access permissions to users from other AWS accounts. They support conditions and can specify which principals can perform which actions on the bucket.",
            category: "Design Secure Architectures (30%)",
            difficulty: "Medium",
            topic: "Secure Access Design"
          },
          {
            id: "aws-saa-2",
            question: "Which AWS service provides DDoS protection at no additional cost?",
            options: [
              "AWS WAF",
              "AWS Shield Standard",
              "AWS Shield Advanced",
              "Amazon GuardDuty"
            ],
            correctAnswer: 1,
            explanation: "AWS Shield Standard provides automatic DDoS protection for all AWS customers at no additional cost. It protects against common network and transport layer attacks on your website or application.",
            category: "Design Secure Architectures (30%)",
            difficulty: "Easy",
            topic: "Secure Workloads"
          },
          {
            id: "aws-saa-3",
            question: "A company needs to encrypt data at rest in S3 with full control over the encryption keys. Which option should they choose?",
            options: [
              "SSE-S3 (Server-Side Encryption with S3 managed keys)",
              "SSE-KMS (Server-Side Encryption with KMS)",
              "SSE-C (Server-Side Encryption with Customer-provided keys)",
              "Client-side encryption"
            ],
            correctAnswer: 2,
            explanation: "SSE-C allows customers to manage their own encryption keys while AWS manages the encryption/decryption process. The customer provides the encryption key with each request, giving them full control over the keys.",
            category: "Design Secure Architectures (30%)",
            difficulty: "Medium",
            topic: "Data Security Controls"
          },
          {
            id: "aws-saa-4",
            question: "What is the recommended way to allow an EC2 instance in a private subnet to download software updates from the internet?",
            options: [
              "Attach an Elastic IP to the instance",
              "Use an Internet Gateway",
              "Use a NAT Gateway",
              "Use VPC Peering"
            ],
            correctAnswer: 2,
            explanation: "A NAT Gateway allows instances in a private subnet to initiate outbound traffic to the internet while preventing unsolicited inbound connections. It's placed in a public subnet and routes traffic through an Internet Gateway.",
            category: "Design Secure Architectures (30%)",
            difficulty: "Easy",
            topic: "Secure Access Design"
          },
          {
            id: "aws-saa-5",
            question: "Which service should you use to automatically replicate data across multiple AWS regions for disaster recovery?",
            options: [
              "AWS Backup",
              "Amazon S3 Cross-Region Replication",
              "AWS DataSync",
              "AWS Storage Gateway"
            ],
            correctAnswer: 1,
            explanation: "S3 Cross-Region Replication (CRR) automatically replicates objects across buckets in different AWS regions. It provides asynchronous copying of objects, helping meet compliance and disaster recovery requirements.",
            category: "Design Resilient Architectures (26%)",
            difficulty: "Easy",
            topic: "Disaster Recovery"
          },
          {
            id: "aws-saa-6",
            question: "A web application experiences variable traffic throughout the day. Which feature automatically adjusts capacity based on demand?",
            options: [
              "Elastic Load Balancing",
              "Amazon CloudWatch",
              "AWS Auto Scaling",
              "AWS Lambda"
            ],
            correctAnswer: 2,
            explanation: "AWS Auto Scaling monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. It can scale EC2 instances, ECS tasks, DynamoDB tables, and more.",
            category: "Design Resilient Architectures (26%)",
            difficulty: "Easy",
            topic: "Scalable Architectures"
          },
          {
            id: "aws-saa-7",
            question: "Which RDS feature provides automatic failover to a standby instance in another Availability Zone?",
            options: [
              "Read Replicas",
              "Multi-AZ deployment",
              "Automated backups",
              "Database snapshots"
            ],
            correctAnswer: 1,
            explanation: "Multi-AZ deployments provide high availability by maintaining a synchronous standby replica in a different Availability Zone. In case of infrastructure failure, RDS automatically fails over to the standby instance.",
            category: "Design Resilient Architectures (26%)",
            difficulty: "Easy",
            topic: "High Availability"
          },
          {
            id: "aws-saa-8",
            question: "A company needs to distribute content globally with low latency. Which combination of services should they use?",
            options: [
              "S3 + Route 53",
              "S3 + CloudFront",
              "EBS + ELB",
              "EC2 + Auto Scaling"
            ],
            correctAnswer: 1,
            explanation: "Amazon S3 combined with CloudFront provides a highly scalable, low-latency solution for global content distribution. CloudFront caches content at edge locations worldwide, reducing latency for end users.",
            category: "Design Resilient Architectures (26%)",
            difficulty: "Medium",
            topic: "Scalable Architectures"
          },
          {
            id: "aws-saa-9",
            question: "Which disaster recovery strategy provides the fastest recovery time objective (RTO)?",
            options: [
              "Backup and Restore",
              "Pilot Light",
              "Warm Standby",
              "Multi-Site Active-Active"
            ],
            correctAnswer: 3,
            explanation: "Multi-Site Active-Active runs your workload simultaneously in multiple regions with full capacity. It provides near-zero RTO and RPO as traffic can be immediately redirected to healthy regions without provisioning additional resources.",
            category: "Design Resilient Architectures (26%)",
            difficulty: "Medium",
            topic: "Disaster Recovery"
          },
          {
            id: "aws-saa-10",
            question: "Which S3 storage class is most cost-effective for data that is accessed less than once per quarter?",
            options: [
              "S3 Standard",
              "S3 Standard-IA",
              "S3 Glacier Flexible Retrieval",
              "S3 Intelligent-Tiering"
            ],
            correctAnswer: 2,
            explanation: "S3 Glacier Flexible Retrieval (formerly Glacier) is designed for archive data that is accessed once or twice per year. It offers very low storage costs with retrieval times from minutes to hours.",
            category: "Design High-Performing Architectures (24%)",
            difficulty: "Medium",
            topic: "Storage Solutions"
          },
          {
            id: "aws-saa-11",
            question: "Which EC2 instance type is optimized for memory-intensive workloads like in-memory databases?",
            options: [
              "C5 instances",
              "R5 instances",
              "T3 instances",
              "M5 instances"
            ],
            correctAnswer: 1,
            explanation: "R5 instances are memory-optimized instances designed for memory-intensive applications like in-memory databases, real-time big data analytics, and high-performance databases. They offer high memory-to-vCPU ratios.",
            category: "Design High-Performing Architectures (24%)",
            difficulty: "Easy",
            topic: "Compute Solutions"
          },
          {
            id: "aws-saa-12",
            question: "Which AWS database service is best suited for applications requiring single-digit millisecond latency?",
            options: [
              "Amazon RDS",
              "Amazon Redshift",
              "Amazon DynamoDB",
              "Amazon Aurora"
            ],
            correctAnswer: 2,
            explanation: "Amazon DynamoDB is a fully managed NoSQL database that provides single-digit millisecond performance at any scale. It's ideal for applications requiring consistent, fast performance like gaming, IoT, and mobile apps.",
            category: "Design High-Performing Architectures (24%)",
            difficulty: "Easy",
            topic: "Database Solutions"
          },
          {
            id: "aws-saa-13",
            question: "A company needs to analyze petabytes of data using standard SQL. Which service should they use?",
            options: [
              "Amazon RDS",
              "Amazon DynamoDB",
              "Amazon Redshift",
              "Amazon ElastiCache"
            ],
            correctAnswer: 2,
            explanation: "Amazon Redshift is a fast, fully managed data warehouse that makes it simple and cost-effective to analyze large amounts of data using standard SQL and existing BI tools. It's optimized for OLAP workloads.",
            category: "Design High-Performing Architectures (24%)",
            difficulty: "Easy",
            topic: "Database Solutions"
          },
          {
            id: "aws-saa-14",
            question: "Which VPC feature allows instances in different VPCs to communicate privately?",
            options: [
              "Internet Gateway",
              "VPC Peering",
              "NAT Gateway",
              "Virtual Private Gateway"
            ],
            correctAnswer: 1,
            explanation: "VPC Peering allows you to route traffic between two VPCs using private IP addresses. Instances in either VPC can communicate with each other as if they are within the same network.",
            category: "Design High-Performing Architectures (24%)",
            difficulty: "Easy",
            topic: "Network Architectures"
          },
          {
            id: "aws-saa-15",
            question: "What is the most cost-effective way to store infrequently accessed data that requires immediate access when needed?",
            options: [
              "S3 Standard",
              "S3 Standard-IA",
              "S3 Glacier",
              "EBS volumes"
            ],
            correctAnswer: 1,
            explanation: "S3 Standard-Infrequent Access (S3 Standard-IA) is designed for data that is accessed less frequently but requires rapid access when needed. It offers lower storage costs than S3 Standard with the same performance.",
            category: "Design Cost-Optimized Architectures (20%)",
            difficulty: "Easy",
            topic: "Cost-Optimized Storage"
          },
          {
            id: "aws-saa-16",
            question: "Which EC2 pricing option offers up to 90% discount but can be interrupted with a 2-minute notice?",
            options: [
              "On-Demand Instances",
              "Reserved Instances",
              "Spot Instances",
              "Dedicated Hosts"
            ],
            correctAnswer: 2,
            explanation: "Spot Instances allow you to bid on unused EC2 capacity at up to 90% discount compared to On-Demand prices. AWS can interrupt them with a 2-minute warning when capacity is needed, making them ideal for fault-tolerant workloads.",
            category: "Design Cost-Optimized Architectures (20%)",
            difficulty: "Easy",
            topic: "Cost-Optimized Compute"
          },
          {
            id: "aws-saa-17",
            question: "Which service helps you identify idle and underutilized resources to reduce costs?",
            options: [
              "AWS Cost Explorer",
              "AWS Trusted Advisor",
              "AWS Budgets",
              "AWS Cost and Usage Report"
            ],
            correctAnswer: 1,
            explanation: "AWS Trusted Advisor provides recommendations to help optimize your AWS infrastructure, including identifying idle or underutilized resources. It checks for cost optimization opportunities across your AWS environment.",
            category: "Design Cost-Optimized Architectures (20%)",
            difficulty: "Easy",
            topic: "Cost Management"
          },
          {
            id: "aws-saa-18",
            question: "What is the benefit of using S3 Lifecycle policies?",
            options: [
              "Improve read performance",
              "Automatically transition objects to cheaper storage classes",
              "Encrypt objects automatically",
              "Enable versioning"
            ],
            correctAnswer: 1,
            explanation: "S3 Lifecycle policies automatically transition objects between storage classes or expire them based on defined rules. This helps optimize costs by moving infrequently accessed data to cheaper storage tiers.",
            category: "Design Cost-Optimized Architectures (20%)",
            difficulty: "Easy",
            topic: "Cost-Optimized Storage"
          },
          {
            id: "aws-saa-19",
            question: "Which feature allows you to reserve compute capacity for 1 or 3 years in exchange for significant discounts?",
            options: [
              "Savings Plans",
              "Spot Fleet",
              "Auto Scaling",
              "Elastic IPs"
            ],
            correctAnswer: 0,
            explanation: "Savings Plans offer flexible pricing models that provide significant savings (up to 72%) compared to On-Demand pricing in exchange for a commitment to a consistent amount of usage for 1 or 3 years.",
            category: "Design Cost-Optimized Architectures (20%)",
            difficulty: "Medium",
            topic: "Cost-Optimized Compute"
          },
          {
            id: "aws-saa-20",
            question: "Which AWS service provides recommendations for right-sizing EC2 instances?",
            options: [
              "AWS Systems Manager",
              "AWS Compute Optimizer",
              "AWS Config",
              "Amazon Inspector"
            ],
            correctAnswer: 1,
            explanation: "AWS Compute Optimizer analyzes your resource utilization and provides recommendations to right-size your EC2 instances, Auto Scaling groups, EBS volumes, and Lambda functions to reduce costs and improve performance.",
            category: "Design Cost-Optimized Architectures (20%)",
            difficulty: "Medium",
            topic: "Cost Management"
          }
        ]
      },
      {
        id: "data-engineer-associate",
        name: "AWS Data Engineer Associate",
        level: "Associate",
        categories: [
          "Data Ingestion and Transformation (34%)",
          "Data Store Management (26%)",
          "Data Operations and Support (22%)",
          "Data Security and Governance (18%)"
        ],
        questions: [
          {
            id: "aws-dea-1",
            question: "Which AWS service is designed for real-time data streaming and processing?",
            options: [
              "Amazon S3",
              "Amazon Kinesis Data Streams",
              "AWS Glue",
              "Amazon Redshift"
            ],
            correctAnswer: 1,
            explanation: "Amazon Kinesis Data Streams is a scalable real-time data streaming service that can continuously capture gigabytes of data per second from hundreds of thousands of sources for real-time processing.",
            category: "Data Ingestion and Transformation (34%)",
            difficulty: "Easy",
            topic: "Data Ingestion Solutions"
          },
          {
            id: "aws-dea-2",
            question: "What is AWS Glue primarily used for?",
            options: [
              "Real-time data streaming",
              "Data warehousing",
              "ETL (Extract, Transform, Load) operations",
              "Database migration"
            ],
            correctAnswer: 2,
            explanation: "AWS Glue is a fully managed ETL service that makes it easy to prepare and transform data for analytics. It automatically discovers and catalogs data, generates ETL code, and manages job execution.",
            category: "Data Ingestion and Transformation (34%)",
            difficulty: "Easy",
            topic: "Data Processing"
          },
          {
            id: "aws-dea-3",
            question: "Which AWS service helps orchestrate and schedule data workflows?",
            options: [
              "AWS Lambda",
              "AWS Step Functions",
              "Amazon EventBridge",
              "AWS Glue Workflows"
            ],
            correctAnswer: 3,
            explanation: "AWS Glue Workflows allow you to create and visualize complex ETL pipelines, orchestrating multiple Glue jobs, crawlers, and triggers. It provides a visual interface for managing dependencies between different ETL components.",
            category: "Data Ingestion and Transformation (34%)",
            difficulty: "Medium",
            topic: "Pipeline Orchestration"
          },
          {
            id: "aws-dea-4",
            question: "What is the primary purpose of AWS Data Pipeline?",
            options: [
              "Real-time data analytics",
              "Moving and transforming data between AWS services",
              "Data encryption",
              "Database replication"
            ],
            correctAnswer: 1,
            explanation: "AWS Data Pipeline is a web service for orchestrating data-driven workflows. It helps you move and process data between different AWS compute and storage services, as well as on-premises data sources.",
            category: "Data Ingestion and Transformation (34%)",
            difficulty: "Medium",
            topic: "Data Ingestion Solutions"
          },
          {
            id: "aws-dea-5",
            question: "Which service provides serverless query capabilities directly on data stored in S3?",
            options: [
              "Amazon Redshift",
              "Amazon RDS",
              "Amazon Athena",
              "AWS Glue"
            ],
            correctAnswer: 2,
            explanation: "Amazon Athena is an interactive query service that makes it easy to analyze data directly in Amazon S3 using standard SQL. It's serverless, so there's no infrastructure to set up or manage.",
            category: "Data Ingestion and Transformation (34%)",
            difficulty: "Easy",
            topic: "Data Processing"
          },
          {
            id: "aws-dea-6",
            question: "Which AWS service should you use to convert streaming data into formats suitable for analytics?",
            options: [
              "Kinesis Data Streams",
              "Kinesis Data Firehose",
              "Kinesis Data Analytics",
              "Amazon EMR"
            ],
            correctAnswer: 1,
            explanation: "Kinesis Data Firehose can transform streaming data before delivering it to destinations. It supports Lambda functions for custom transformations and can convert data formats (like JSON to Parquet) automatically.",
            category: "Data Ingestion and Transformation (34%)",
            difficulty: "Medium",
            topic: "Data Processing"
          },
          {
            id: "aws-dea-7",
            question: "What is the AWS Glue Data Catalog?",
            options: [
              "A data warehouse",
              "A metadata repository for data assets",
              "A data migration tool",
              "A backup service"
            ],
            correctAnswer: 1,
            explanation: "The AWS Glue Data Catalog is a persistent metadata store that acts as a central repository. It stores structural and operational metadata for all data assets, making data discoverable and queryable.",
            category: "Data Store Management (26%)",
            difficulty: "Easy",
            topic: "Data Cataloging"
          },
          {
            id: "aws-dea-8",
            question: "Which storage solution is best for a data lake storing petabytes of structured and unstructured data?",
            options: [
              "Amazon RDS",
              "Amazon DynamoDB",
              "Amazon S3",
              "Amazon EBS"
            ],
            correctAnswer: 2,
            explanation: "Amazon S3 is ideal for data lakes as it can store unlimited amounts of data in any format at low cost. It integrates with analytics services like Athena, Glue, and EMR for processing data lake contents.",
            category: "Data Store Management (26%)",
            difficulty: "Easy",
            topic: "Data Store Selection"
          },
          {
            id: "aws-dea-9",
            question: "Which feature of S3 automatically moves objects to different storage classes based on access patterns?",
            options: [
              "S3 Versioning",
              "S3 Lifecycle Policies",
              "S3 Intelligent-Tiering",
              "S3 Replication"
            ],
            correctAnswer: 2,
            explanation: "S3 Intelligent-Tiering automatically moves objects between access tiers based on changing access patterns. It monitors access patterns and moves objects that haven't been accessed to lower-cost tiers automatically.",
            category: "Data Store Management (26%)",
            difficulty: "Medium",
            topic: "Data Lifecycle"
          },
          {
            id: "aws-dea-10",
            question: "What is the recommended way to partition data in S3 for optimal query performance in Athena?",
            options: [
              "By file size",
              "By file type",
              "By date or other frequently queried columns",
              "Randomly"
            ],
            correctAnswer: 2,
            explanation: "Partitioning data in S3 by frequently queried columns (like date, region, or product category) significantly improves Athena query performance and reduces costs by limiting the amount of data scanned per query.",
            category: "Data Store Management (26%)",
            difficulty: "Medium",
            topic: "Data Store Selection"
          },
          {
            id: "aws-dea-11",
            question: "Which AWS service provides managed Apache Spark for big data processing?",
            options: [
              "AWS Glue",
              "Amazon EMR",
              "Amazon Kinesis",
              "AWS Lambda"
            ],
            correctAnswer: 1,
            explanation: "Amazon EMR (Elastic MapReduce) is a managed cluster platform that simplifies running big data frameworks like Apache Spark, Hadoop, and Presto. It handles provisioning, configuration, and scaling of clusters.",
            category: "Data Store Management (26%)",
            difficulty: "Easy",
            topic: "Data Store Selection"
          },
          {
            id: "aws-dea-12",
            question: "What is AWS Lake Formation primarily used for?",
            options: [
              "Creating databases",
              "Building and managing secure data lakes",
              "Real-time streaming",
              "Data visualization"
            ],
            correctAnswer: 1,
            explanation: "AWS Lake Formation makes it easy to set up, secure, and manage data lakes. It automates data ingestion, cataloging, transformation, and security, simplifying the process of building and managing data lakes.",
            category: "Data Store Management (26%)",
            difficulty: "Medium",
            topic: "Data Cataloging"
          },
          {
            id: "aws-dea-13",
            question: "Which service automates the process of discovering and categorizing data for the Glue Data Catalog?",
            options: [
              "AWS Glue ETL Jobs",
              "AWS Glue Crawlers",
              "AWS Glue Triggers",
              "AWS Glue Connections"
            ],
            correctAnswer: 1,
            explanation: "AWS Glue Crawlers automatically scan data stores, identify data formats, and infer schemas. They populate the Glue Data Catalog with table definitions and partition information.",
            category: "Data Operations and Support (22%)",
            difficulty: "Easy",
            topic: "Data Automation"
          },
          {
            id: "aws-dea-14",
            question: "Which CloudWatch metric should you monitor to optimize Kinesis Data Streams performance?",
            options: [
              "NetworkIn",
              "CPUUtilization",
              "IncomingBytes and IncomingRecords",
              "DiskReadOps"
            ],
            correctAnswer: 2,
            explanation: "IncomingBytes and IncomingRecords are key metrics for Kinesis Data Streams. Monitoring these helps you understand throughput and determine if you need to add or remove shards to optimize performance.",
            category: "Data Operations and Support (22%)",
            difficulty: "Medium",
            topic: "Pipeline Monitoring"
          },
          {
            id: "aws-dea-15",
            question: "What is the purpose of AWS Glue job bookmarks?",
            options: [
              "To save favorite jobs",
              "To track processed data and prevent reprocessing",
              "To schedule jobs",
              "To monitor job performance"
            ],
            correctAnswer: 1,
            explanation: "Glue job bookmarks track data that has already been processed during previous runs of an ETL job. This prevents reprocessing of old data and enables incremental data processing.",
            category: "Data Operations and Support (22%)",
            difficulty: "Medium",
            topic: "Data Automation"
          },
          {
            id: "aws-dea-16",
            question: "Which AWS service helps optimize Redshift query performance?",
            options: [
              "AWS CloudTrail",
              "Amazon Redshift Advisor",
              "AWS Config",
              "Amazon Inspector"
            ],
            correctAnswer: 1,
            explanation: "Amazon Redshift Advisor analyzes your cluster's workload and provides specific recommendations to improve performance and reduce operating costs, such as compression encoding, table design, and distribution keys.",
            category: "Data Operations and Support (22%)",
            difficulty: "Medium",
            topic: "Performance Optimization"
          },
          {
            id: "aws-dea-17",
            question: "What is the benefit of using columnar storage formats like Parquet for data lakes?",
            options: [
              "Faster writes",
              "Better compression and query performance",
              "Easier to read by humans",
              "Smaller file sizes only"
            ],
            correctAnswer: 1,
            explanation: "Columnar formats like Parquet provide better compression and significantly faster query performance, especially for analytical queries that scan specific columns. They're ideal for data lakes and work well with Athena and Glue.",
            category: "Data Operations and Support (22%)",
            difficulty: "Medium",
            topic: "Performance Optimization"
          },
          {
            id: "aws-dea-18",
            question: "Which AWS service should you use to control access to data catalog resources?",
            options: [
              "AWS IAM",
              "AWS Lake Formation",
              "Amazon S3 bucket policies",
              "AWS KMS"
            ],
            correctAnswer: 1,
            explanation: "AWS Lake Formation provides centralized access control for data lake resources. It allows you to define fine-grained permissions at the database, table, and column levels in the Glue Data Catalog.",
            category: "Data Security and Governance (18%)",
            difficulty: "Medium",
            topic: "Data Authentication"
          },
          {
            id: "aws-dea-19",
            question: "What is the recommended way to encrypt data at rest in Amazon Redshift?",
            options: [
              "Application-level encryption",
              "AWS KMS encryption",
              "Hardware Security Module (HSM)",
              "Both KMS and HSM are supported"
            ],
            correctAnswer: 3,
            explanation: "Amazon Redshift supports encryption at rest using AWS KMS or a Hardware Security Module (HSM). KMS is easier to set up and manage, while HSM provides additional control over encryption keys.",
            category: "Data Security and Governance (18%)",
            difficulty: "Medium",
            topic: "Data Encryption"
          },
          {
            id: "aws-dea-20",
            question: "Which service provides a complete audit trail of data access and changes in your data lake?",
            options: [
              "AWS CloudWatch",
              "AWS CloudTrail",
              "Amazon S3 access logs",
              "AWS Config"
            ],
            correctAnswer: 1,
            explanation: "AWS CloudTrail records AWS API calls and provides a complete audit trail of who accessed what data and when. For data lakes, it logs access to S3 buckets, Glue operations, and other data service activities.",
            category: "Data Security and Governance (18%)",
            difficulty: "Easy",
            topic: "Data Auditing"
          }
        ]
      }
    ]
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    icon: "/azure_logo.svg",
    certifications: [
      {
        id: "azure-fundamentals",
        name: "Azure Fundamentals",
        level: "Foundational",
        categories: [
          "Cloud Concepts (25-30%)",
          "Azure Architecture and Services (35-40%)",
          "Azure Management and Governance (30-35%)"
        ],
        questions: [
          {
            id: "az-900-1",
            question: "What is the primary benefit of using cloud computing?",
            options: [
              "Complete control over physical hardware",
              "Pay-as-you-go pricing model",
              "Unlimited free storage",
              "Guaranteed 100% uptime"
            ],
            correctAnswer: 1,
            explanation: "Cloud computing uses a pay-as-you-go (consumption-based) pricing model where you only pay for the computing resources you use. This eliminates large upfront costs and allows for flexible scaling.",
            category: "Cloud Concepts (25-30%)",
            difficulty: "Easy",
            topic: "Cloud Computing Benefits"
          },
          {
            id: "az-900-2",
            question: "According to the shared responsibility model, which security task is always the responsibility of the cloud provider?",
            options: [
              "Managing user access to resources",
              "Encrypting data at rest",
              "Physical security of datacenters",
              "Configuring network firewalls"
            ],
            correctAnswer: 2,
            explanation: "In the shared responsibility model, the cloud provider is always responsible for physical security of datacenters, including the physical infrastructure, hardware, and facilities. Customers are responsible for security configurations within the cloud.",
            category: "Cloud Concepts (25-30%)",
            difficulty: "Easy",
            topic: "Shared Responsibility"
          },
          {
            id: "az-900-3",
            question: "Which cloud service type provides the most control over the operating system and installed software?",
            options: [
              "Software as a Service (SaaS)",
              "Platform as a Service (PaaS)",
              "Infrastructure as a Service (IaaS)",
              "Function as a Service (FaaS)"
            ],
            correctAnswer: 2,
            explanation: "IaaS provides the most control as you manage the operating system, middleware, runtime, and applications. The cloud provider manages only the physical infrastructure, virtualization, and networking.",
            category: "Cloud Concepts (25-30%)",
            difficulty: "Medium",
            topic: "Cloud Service Types"
          },
          {
            id: "az-900-4",
            question: "What is the main advantage of the consumption-based pricing model in Azure?",
            options: [
              "Fixed monthly costs regardless of usage",
              "Free services for the first year",
              "You pay only for what you use",
              "Unlimited resource allocation"
            ],
            correctAnswer: 2,
            explanation: "The consumption-based model means you pay only for the resources you actually use. This eliminates the need to predict usage patterns and reduces waste from over-provisioning.",
            category: "Cloud Concepts (25-30%)",
            difficulty: "Easy",
            topic: "Consumption Models"
          },
          {
            id: "az-900-5",
            question: "What are Azure Availability Zones?",
            options: [
              "Different Azure subscription tiers",
              "Physically separate datacenters within an Azure region",
              "Virtual networks in Azure",
              "Storage account types"
            ],
            correctAnswer: 1,
            explanation: "Availability Zones are physically separate datacenters within an Azure region. Each zone has independent power, cooling, and networking to provide high availability and fault tolerance.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Easy",
            topic: "Azure Regions and Zones"
          },
          {
            id: "az-900-6",
            question: "Which Azure service provides virtual machines that you can configure and manage?",
            options: [
              "Azure Functions",
              "Azure App Service",
              "Azure Virtual Machines",
              "Azure Container Instances"
            ],
            correctAnswer: 2,
            explanation: "Azure Virtual Machines (VMs) provide IaaS compute resources where you have full control over the configuration and management of the operating system and installed software.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Easy",
            topic: "Azure Compute Services"
          },
          {
            id: "az-900-7",
            question: "What is Azure Blob Storage primarily used for?",
            options: [
              "Hosting relational databases",
              "Running containerized applications",
              "Storing unstructured data like documents and images",
              "Managing virtual networks"
            ],
            correctAnswer: 2,
            explanation: "Azure Blob Storage is designed for storing massive amounts of unstructured data such as text, binary data, documents, images, and videos. It's optimized for serving content directly to browsers.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Easy",
            topic: "Azure Storage"
          },
          {
            id: "az-900-8",
            question: "Which Azure service provides a fully managed NoSQL database with global distribution?",
            options: [
              "Azure SQL Database",
              "Azure Database for MySQL",
              "Azure Cosmos DB",
              "Azure Database for PostgreSQL"
            ],
            correctAnswer: 2,
            explanation: "Azure Cosmos DB is a globally distributed, multi-model NoSQL database service that provides guaranteed low latency, automatic scaling, and comprehensive SLAs for availability, consistency, and throughput.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Easy",
            topic: "Azure Databases"
          },
          {
            id: "az-900-9",
            question: "What is Azure Active Directory (Azure AD) used for?",
            options: [
              "Storing files and documents",
              "Managing virtual machines",
              "Identity and access management",
              "Network routing"
            ],
            correctAnswer: 2,
            explanation: "Azure Active Directory is Microsoft's cloud-based identity and access management service. It helps users sign in and access resources, and enables features like multi-factor authentication and single sign-on.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Easy",
            topic: "Azure Identity"
          },
          {
            id: "az-900-10",
            question: "Which Azure networking service connects your on-premises network to Azure over a private connection?",
            options: [
              "Azure VPN Gateway",
              "Azure ExpressRoute",
              "Azure Virtual Network",
              "Azure Load Balancer"
            ],
            correctAnswer: 1,
            explanation: "Azure ExpressRoute provides private, dedicated connections from on-premises networks to Azure datacenters. It offers more reliability, faster speeds, and lower latencies than typical internet connections.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Medium",
            topic: "Azure Networking"
          },
          {
            id: "az-900-11",
            question: "Which tool would you use to estimate the monthly costs of Azure services before deploying them?",
            options: [
              "Azure Cost Management",
              "Azure Pricing Calculator",
              "Azure Advisor",
              "Azure Monitor"
            ],
            correctAnswer: 1,
            explanation: "The Azure Pricing Calculator allows you to estimate costs for Azure services before deployment. You can configure different service options and see estimated monthly costs.",
            category: "Azure Management and Governance (30-35%)",
            difficulty: "Easy",
            topic: "Cost Management"
          },
          {
            id: "az-900-12",
            question: "What is Azure Policy used for?",
            options: [
              "Managing user passwords",
              "Enforcing organizational standards and compliance",
              "Backing up virtual machines",
              "Routing network traffic"
            ],
            correctAnswer: 1,
            explanation: "Azure Policy helps enforce organizational standards and assess compliance at scale. It can automatically apply rules and configurations across resources to maintain consistency and compliance.",
            category: "Azure Management and Governance (30-35%)",
            difficulty: "Easy",
            topic: "Governance Tools"
          },
          {
            id: "az-900-13",
            question: "Which Azure service provides recommendations to improve the performance, security, and cost-effectiveness of your resources?",
            options: [
              "Azure Monitor",
              "Azure Advisor",
              "Azure Security Center",
              "Azure Service Health"
            ],
            correctAnswer: 1,
            explanation: "Azure Advisor analyzes your resource configurations and usage telemetry to provide personalized recommendations for optimizing your Azure deployments for high availability, security, performance, and cost.",
            category: "Azure Management and Governance (30-35%)",
            difficulty: "Easy",
            topic: "Monitoring Tools"
          },
          {
            id: "az-900-14",
            question: "What is the purpose of Azure Resource Manager (ARM) templates?",
            options: [
              "To monitor application performance",
              "To deploy and manage resources as infrastructure as code",
              "To backup data automatically",
              "To manage user identities"
            ],
            correctAnswer: 1,
            explanation: "ARM templates are JSON files that define the infrastructure and configuration for your Azure resources. They enable infrastructure as code, allowing you to deploy resources consistently and repeatedly.",
            category: "Azure Management and Governance (30-35%)",
            difficulty: "Medium",
            topic: "Management Tools"
          },
          {
            id: "az-900-15",
            question: "What does Azure Service Level Agreement (SLA) define?",
            options: [
              "The maximum monthly cost for services",
              "The guaranteed uptime and performance commitments",
              "The physical location of datacenters",
              "The types of resources you can create"
            ],
            correctAnswer: 1,
            explanation: "Azure SLAs define Microsoft's commitments for uptime and connectivity of Azure services. They specify guaranteed performance levels and provide service credits if those commitments aren't met.",
            category: "Azure Management and Governance (30-35%)",
            difficulty: "Easy",
            topic: "Monitoring Tools"
          },
          {
            id: "az-900-16",
            question: "Which Azure feature allows you to organize resources into logical groups for management and billing?",
            options: [
              "Azure Regions",
              "Azure Resource Groups",
              "Azure Availability Zones",
              "Azure Subscriptions"
            ],
            correctAnswer: 1,
            explanation: "Resource Groups are logical containers that hold related Azure resources. They simplify resource management, access control, and cost tracking by grouping resources that share the same lifecycle.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Easy",
            topic: "Azure Regions and Zones"
          },
          {
            id: "az-900-17",
            question: "What is Azure App Service primarily used for?",
            options: [
              "Storing data in databases",
              "Hosting web applications and APIs",
              "Managing virtual networks",
              "Monitoring resource performance"
            ],
            correctAnswer: 1,
            explanation: "Azure App Service is a fully managed platform for building, deploying, and scaling web apps and APIs. It supports multiple programming languages and provides automatic scaling, security patching, and CI/CD integration.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Easy",
            topic: "Azure Compute Services"
          },
          {
            id: "az-900-18",
            question: "Which storage redundancy option replicates data across multiple Azure regions?",
            options: [
              "Locally Redundant Storage (LRS)",
              "Zone-Redundant Storage (ZRS)",
              "Geo-Redundant Storage (GRS)",
              "Premium SSD"
            ],
            correctAnswer: 2,
            explanation: "Geo-Redundant Storage (GRS) replicates your data to a secondary region hundreds of miles away from the primary region, providing protection against regional disasters and ensuring data durability.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Medium",
            topic: "Azure Storage"
          },
          {
            id: "az-900-19",
            question: "What is the purpose of resource locks in Azure?",
            options: [
              "To improve performance",
              "To prevent accidental deletion or modification of resources",
              "To reduce costs",
              "To enable automatic backups"
            ],
            correctAnswer: 1,
            explanation: "Resource locks prevent accidental deletion or modification of critical Azure resources. You can set locks at the subscription, resource group, or resource level with two types: CanNotDelete and ReadOnly.",
            category: "Azure Management and Governance (30-35%)",
            difficulty: "Medium",
            topic: "Governance Tools"
          },
          {
            id: "az-900-20",
            question: "Which Azure service would you use to run code without managing servers or infrastructure?",
            options: [
              "Azure Virtual Machines",
              "Azure Functions",
              "Azure Virtual Network",
              "Azure SQL Database"
            ],
            correctAnswer: 1,
            explanation: "Azure Functions is a serverless compute service that allows you to run event-driven code without explicitly provisioning or managing infrastructure. You only pay for the compute time you consume.",
            category: "Azure Architecture and Services (35-40%)",
            difficulty: "Easy",
            topic: "Azure Compute Services"
          }
        ]
      },
      {
        id: "azure-developer-associate",
        name: "Azure Developer Associate",
        level: "Associate",
        categories: [
          "Develop Azure compute solutions (25-30%)",
          "Develop for Azure storage (15-20%)",
          "Implement Azure security (20-25%)",
          "Monitor, troubleshoot, and optimize (15-20%)",
          "Connect to and consume services (15-20%)"
        ],
        questions: [
          {
            id: "az-204-1",
            question: "Which Azure service should you use to deploy containerized applications without managing the underlying infrastructure?",
            options: [
              "Azure Virtual Machines",
              "Azure Container Instances",
              "Azure Batch",
              "Azure DevOps"
            ],
            correctAnswer: 1,
            explanation: "Azure Container Instances (ACI) provides the fastest and simplest way to run containers in Azure without managing virtual machines or adopting higher-level services. It's ideal for simple applications, task automation, and build jobs.",
            category: "Develop Azure compute solutions (25-30%)",
            difficulty: "Easy",
            topic: "Container Solutions"
          },
          {
            id: "az-204-2",
            question: "What is the purpose of an ARM template in Azure?",
            options: [
              "To monitor application performance",
              "To define and deploy Azure resources declaratively",
              "To manage user authentication",
              "To encrypt data at rest"
            ],
            correctAnswer: 1,
            explanation: "ARM (Azure Resource Manager) templates are JSON files that define the infrastructure and configuration for your project declaratively. They enable infrastructure as code and ensure consistent, repeatable deployments.",
            category: "Develop Azure compute solutions (25-30%)",
            difficulty: "Easy",
            topic: "ARM Templates"
          },
          {
            id: "az-204-3",
            question: "Which App Service feature automatically adjusts the number of instances based on rules and schedules?",
            options: [
              "Deployment slots",
              "App Service Plan",
              "Autoscaling",
              "Custom domains"
            ],
            correctAnswer: 2,
            explanation: "Autoscaling in Azure App Service automatically adjusts the number of instances running your app based on metrics (like CPU usage) or schedules, helping optimize performance and costs.",
            category: "Develop Azure compute solutions (25-30%)",
            difficulty: "Easy",
            topic: "App Service"
          },
          {
            id: "az-204-4",
            question: "What is the maximum execution time for an Azure Function in a Consumption plan?",
            options: [
              "5 minutes",
              "10 minutes",
              "30 minutes",
              "Unlimited"
            ],
            correctAnswer: 1,
            explanation: "Azure Functions in a Consumption plan have a default timeout of 5 minutes, configurable up to 10 minutes. For longer-running functions, you should use a Premium or Dedicated (App Service) plan.",
            category: "Develop Azure compute solutions (25-30%)",
            difficulty: "Medium",
            topic: "Azure Functions"
          },
          {
            id: "az-204-5",
            question: "Which trigger type would you use for an Azure Function that processes messages from a queue?",
            options: [
              "HTTP trigger",
              "Timer trigger",
              "Queue trigger",
              "Blob trigger"
            ],
            correctAnswer: 2,
            explanation: "A Queue trigger causes a function to run when a new message is added to an Azure Storage queue or Service Bus queue. It's ideal for processing work items asynchronously.",
            category: "Develop Azure compute solutions (25-30%)",
            difficulty: "Easy",
            topic: "Azure Functions"
          },
          {
            id: "az-204-6",
            question: "Which Cosmos DB consistency level provides the strongest consistency with the highest latency?",
            options: [
              "Eventual",
              "Session",
              "Strong",
              "Consistent Prefix"
            ],
            correctAnswer: 2,
            explanation: "Strong consistency guarantees that reads return the most recent committed version of an item, but it comes with higher latency and lower availability compared to other consistency levels.",
            category: "Develop for Azure storage (15-20%)",
            difficulty: "Medium",
            topic: "Cosmos DB"
          },
          {
            id: "az-204-7",
            question: "What is the purpose of a shared access signature (SAS) in Azure Storage?",
            options: [
              "To encrypt data at rest",
              "To provide delegated access to storage resources",
              "To replicate data across regions",
              "To improve query performance"
            ],
            correctAnswer: 1,
            explanation: "A SAS provides secure, delegated access to resources in your storage account without sharing your account keys. You can specify what resources the client can access, what permissions they have, and for how long the SAS is valid.",
            category: "Develop for Azure storage (15-20%)",
            difficulty: "Medium",
            topic: "Blob Storage"
          },
          {
            id: "az-204-8",
            question: "Which Azure Storage access tier is most cost-effective for data that is rarely accessed?",
            options: [
              "Hot",
              "Cool",
              "Archive",
              "Premium"
            ],
            correctAnswer: 2,
            explanation: "The Archive tier offers the lowest storage costs but with higher access costs and latency. It's designed for data that is rarely accessed and can tolerate retrieval times of several hours.",
            category: "Develop for Azure storage (15-20%)",
            difficulty: "Easy",
            topic: "Blob Storage"
          },
          {
            id: "az-204-9",
            question: "What is Azure Cognitive Search used for?",
            options: [
              "Training machine learning models",
              "Adding AI-powered search capabilities to applications",
              "Managing databases",
              "Monitoring application performance"
            ],
            correctAnswer: 1,
            explanation: "Azure Cognitive Search is a cloud search service that provides infrastructure, APIs, and tools for building rich search experiences over private, heterogeneous content in web, mobile, and enterprise applications.",
            category: "Develop for Azure storage (15-20%)",
            difficulty: "Easy",
            topic: "Cognitive Search"
          },
          {
            id: "az-204-10",
            question: "Which Azure Files protocol provides the best performance for Linux-based workloads?",
            options: [
              "SMB",
              "NFS",
              "HTTP",
              "FTP"
            ],
            correctAnswer: 1,
            explanation: "NFS (Network File System) protocol in Azure Files is optimized for Linux and UNIX workloads, providing native compatibility and better performance for these operating systems compared to SMB.",
            category: "Develop for Azure storage (15-20%)",
            difficulty: "Medium",
            topic: "Azure Files"
          },
          {
            id: "az-204-11",
            question: "What is the recommended way to authenticate an Azure service to access Azure Key Vault?",
            options: [
              "Using a connection string",
              "Using managed identities",
              "Using a service principal with stored credentials",
              "Using a storage account key"
            ],
            correctAnswer: 1,
            explanation: "Managed identities eliminate the need to manage credentials. Azure automatically manages the identity lifecycle and rotates credentials, making it the most secure and recommended approach for service-to-service authentication.",
            category: "Implement Azure security (20-25%)",
            difficulty: "Easy",
            topic: "Managed Identities"
          },
          {
            id: "az-204-12",
            question: "Which Azure AD authentication flow is most suitable for single-page applications (SPAs)?",
            options: [
              "Client credentials flow",
              "Resource owner password credentials flow",
              "Authorization code flow with PKCE",
              "On-behalf-of flow"
            ],
            correctAnswer: 2,
            explanation: "Authorization code flow with PKCE (Proof Key for Code Exchange) is the recommended OAuth 2.0 flow for SPAs. It provides security against authorization code interception attacks without requiring a client secret.",
            category: "Implement Azure security (20-25%)",
            difficulty: "Medium",
            topic: "User Authentication"
          },
          {
            id: "az-204-13",
            question: "What is the purpose of Azure Key Vault?",
            options: [
              "To store application logs",
              "To manage secrets, keys, and certificates securely",
              "To host databases",
              "To deploy virtual machines"
            ],
            correctAnswer: 1,
            explanation: "Azure Key Vault is a cloud service for securely storing and accessing secrets, encryption keys, and certificates. It helps solve problems like secrets management, key management, and certificate management.",
            category: "Implement Azure security (20-25%)",
            difficulty: "Easy",
            topic: "Key Vault"
          },
          {
            id: "az-204-14",
            question: "Which type of managed identity can be shared across multiple Azure resources?",
            options: [
              "System-assigned managed identity",
              "User-assigned managed identity",
              "Service principal",
              "Managed service identity"
            ],
            correctAnswer: 1,
            explanation: "User-assigned managed identities are created as standalone Azure resources and can be assigned to multiple Azure resources. System-assigned identities are tied to a single resource and are deleted when the resource is deleted.",
            category: "Implement Azure security (20-25%)",
            difficulty: "Medium",
            topic: "Managed Identities"
          },
          {
            id: "az-204-15",
            question: "What does multi-factor authentication (MFA) require in addition to a password?",
            options: [
              "A security question answer",
              "A second form of verification like a phone or token",
              "An email confirmation",
              "A backup password"
            ],
            correctAnswer: 1,
            explanation: "MFA requires users to provide two or more verification factors to gain access. This typically includes something you know (password) and something you have (phone, token) or something you are (biometric).",
            category: "Implement Azure security (20-25%)",
            difficulty: "Easy",
            topic: "Multi-factor Authentication"
          },
          {
            id: "az-204-16",
            question: "Which Azure Monitor component collects and analyzes telemetry from applications?",
            options: [
              "Azure Log Analytics",
              "Application Insights",
              "Azure Service Health",
              "Azure Advisor"
            ],
            correctAnswer: 1,
            explanation: "Application Insights is an APM (Application Performance Management) service that monitors live applications, automatically detects performance anomalies, and includes analytics tools to diagnose issues.",
            category: "Monitor, troubleshoot, and optimize (15-20%)",
            difficulty: "Easy",
            topic: "Application Insights"
          },
          {
            id: "az-204-17",
            question: "What is the purpose of implementing retry logic in Azure applications?",
            options: [
              "To improve application performance",
              "To handle transient faults gracefully",
              "To reduce costs",
              "To enable multi-region deployments"
            ],
            correctAnswer: 1,
            explanation: "Retry logic helps handle transient faults (temporary errors) by automatically retrying failed operations. This improves application resilience when dealing with network issues, service throttling, or temporary unavailability.",
            category: "Monitor, troubleshoot, and optimize (15-20%)",
            difficulty: "Medium",
            topic: "Caching Solutions"
          },
          {
            id: "az-204-18",
            question: "Which Azure service provides distributed caching to improve application performance?",
            options: [
              "Azure SQL Database",
              "Azure Redis Cache",
              "Azure Blob Storage",
              "Azure Table Storage"
            ],
            correctAnswer: 1,
            explanation: "Azure Cache for Redis is a fully managed, in-memory data store based on Redis. It provides sub-millisecond latency and high throughput, making it ideal for caching frequently accessed data.",
            category: "Monitor, troubleshoot, and optimize (15-20%)",
            difficulty: "Easy",
            topic: "Caching Solutions"
          },
          {
            id: "az-204-19",
            question: "What is Azure API Management primarily used for?",
            options: [
              "Deploying virtual machines",
              "Creating and managing APIs with security, throttling, and analytics",
              "Storing data in databases",
              "Monitoring application logs"
            ],
            correctAnswer: 1,
            explanation: "Azure API Management provides a gateway for managing APIs with features like rate limiting, security policies, transformation, caching, monitoring, and developer portal creation.",
            category: "Connect to and consume services (15-20%)",
            difficulty: "Easy",
            topic: "API Management"
          },
          {
            id: "az-204-20",
            question: "Which Azure messaging service provides FIFO (First-In-First-Out) message ordering?",
            options: [
              "Azure Event Grid",
              "Azure Event Hubs",
              "Azure Service Bus",
              "Azure Storage Queues"
            ],
            correctAnswer: 2,
            explanation: "Azure Service Bus queues and topics support FIFO message ordering when using sessions. This guarantees that messages are processed in the order they are sent within a session.",
            category: "Connect to and consume services (15-20%)",
            difficulty: "Medium",
            topic: "Service Bus"
          }
        ]
      },
      {
        id: "azure-solutions-architect-expert",
        name: "Azure Solutions Architect Expert",
        level: "Expert",
        categories: [
          "Design identity, governance, and monitoring (25-30%)",
          "Design data storage solutions (25-30%)",
          "Design business continuity solutions (10-15%)",
          "Design infrastructure solutions (25-30%)"
        ],
        questions: [
          {
            id: "az-305-1",
            question: "What is the purpose of Azure landing zones?",
            options: [
              "To provide temporary storage for migrated data",
              "To establish a well-architected multi-subscription environment",
              "To deploy virtual machines in specific regions",
              "To manage network traffic routing"
            ],
            correctAnswer: 1,
            explanation: "Azure landing zones provide a well-architected, multi-subscription Azure environment that is scalable, secure, and ready for enterprise workloads. They implement governance, security, and networking best practices.",
            category: "Design identity, governance, and monitoring (25-30%)",
            difficulty: "Medium",
            topic: "Governance Solutions"
          },
          {
            id: "az-305-2",
            question: "Which Azure AD feature should you use to enforce time-limited administrative access?",
            options: [
              "Azure AD Connect",
              "Azure AD Privileged Identity Management (PIM)",
              "Azure AD B2C",
              "Azure AD Domain Services"
            ],
            correctAnswer: 1,
            explanation: "Azure AD Privileged Identity Management (PIM) enables just-in-time privileged access, time-bound access, and approval-based role activation, reducing the risk of excessive or unnecessary access permissions.",
            category: "Design identity, governance, and monitoring (25-30%)",
            difficulty: "Medium",
            topic: "Identity Management"
          },
          {
            id: "az-305-3",
            question: "What is the recommended approach for organizing Azure resources across multiple departments?",
            options: [
              "Use a single subscription with resource locks",
              "Use management groups to organize subscriptions hierarchically",
              "Create separate Azure accounts for each department",
              "Use only resource groups"
            ],
            correctAnswer: 1,
            explanation: "Management groups provide a governance scope above subscriptions, allowing you to organize subscriptions hierarchically and apply policies and access controls at scale across multiple subscriptions.",
            category: "Design identity, governance, and monitoring (25-30%)",
            difficulty: "Medium",
            topic: "Governance Solutions"
          },
          {
            id: "az-305-4",
            question: "Which Azure service helps protect against threats by analyzing log data from multiple sources?",
            options: [
              "Azure Policy",
              "Azure Sentinel",
              "Azure Firewall",
              "Azure DDoS Protection"
            ],
            correctAnswer: 1,
            explanation: "Azure Sentinel is a cloud-native SIEM (Security Information and Event Management) and SOAR (Security Orchestration Automated Response) solution that uses AI to analyze large volumes of data across the enterprise.",
            category: "Design identity, governance, and monitoring (25-30%)",
            difficulty: "Medium",
            topic: "Monitoring Strategy"
          },
          {
            id: "az-305-5",
            question: "What is the purpose of Azure Key Vault access policies?",
            options: [
              "To control network access to the vault",
              "To define what operations users and applications can perform on keys, secrets, and certificates",
              "To manage encryption keys automatically",
              "To backup vault contents"
            ],
            correctAnswer: 1,
            explanation: "Access policies in Azure Key Vault define permissions for users, applications, and services to perform operations on keys, secrets, and certificates. They enable fine-grained access control.",
            category: "Design identity, governance, and monitoring (25-30%)",
            difficulty: "Easy",
            topic: "Secret Management"
          },
          {
            id: "az-305-6",
            question: "Which monitoring tool should you use to analyze performance trends across multiple Azure resources?",
            options: [
              "Azure Service Health",
              "Azure Monitor Log Analytics",
              "Application Insights",
              "Azure Advisor"
            ],
            correctAnswer: 1,
            explanation: "Azure Monitor Log Analytics provides a comprehensive querying and analysis platform for examining performance trends, correlating data from multiple resources, and creating custom dashboards and alerts.",
            category: "Design identity, governance, and monitoring (25-30%)",
            difficulty: "Easy",
            topic: "Monitoring Strategy"
          },
          {
            id: "az-305-7",
            question: "Which Azure SQL Database deployment option provides the highest availability SLA?",
            options: [
              "Single database",
              "Elastic pool",
              "Business Critical tier with zone redundancy",
              "General Purpose tier"
            ],
            correctAnswer: 2,
            explanation: "Business Critical tier with zone redundancy provides 99.995% availability SLA by replicating data across availability zones. It offers the highest availability and fastest recovery times.",
            category: "Design data storage solutions (25-30%)",
            difficulty: "Medium",
            topic: "Database Solutions"
          },
          {
            id: "az-305-8",
            question: "What is Azure Synapse Analytics primarily used for?",
            options: [
              "Real-time transaction processing",
              "Big data analytics and data warehousing",
              "Object storage",
              "Identity management"
            ],
            correctAnswer: 1,
            explanation: "Azure Synapse Analytics is an integrated analytics service that combines enterprise data warehousing with big data analytics. It enables querying data on your terms using either serverless or dedicated resources at scale.",
            category: "Design data storage solutions (25-30%)",
            difficulty: "Easy",
            topic: "Data Integration"
          },
          {
            id: "az-305-9",
            question: "Which Cosmos DB consistency level provides the lowest latency?",
            options: [
              "Strong",
              "Bounded Staleness",
              "Eventual",
              "Session"
            ],
            correctAnswer: 2,
            explanation: "Eventual consistency provides the lowest latency and highest availability but with the weakest consistency guarantees. Reads may return stale data, but all replicas eventually converge.",
            category: "Design data storage solutions (25-30%)",
            difficulty: "Medium",
            topic: "Database Solutions"
          },
          {
            id: "az-305-10",
            question: "What is the recommended partition strategy for Cosmos DB when you have a high-cardinality property with even distribution?",
            options: [
              "Use a synthetic partition key combining multiple properties",
              "Use the high-cardinality property as the partition key",
              "Don't specify a partition key",
              "Use a timestamp as the partition key"
            ],
            correctAnswer: 1,
            explanation: "When you have a high-cardinality property with even distribution, using it directly as the partition key is ideal. This ensures even distribution of data and throughput across physical partitions.",
            category: "Design data storage solutions (25-30%)",
            difficulty: "Hard",
            topic: "Database Solutions"
          },
          {
            id: "az-305-11",
            question: "Which Azure storage redundancy option provides protection against regional disasters with read access to secondary region?",
            options: [
              "Locally Redundant Storage (LRS)",
              "Zone-Redundant Storage (ZRS)",
              "Geo-Redundant Storage (GRS)",
              "Read-Access Geo-Redundant Storage (RA-GRS)"
            ],
            correctAnswer: 3,
            explanation: "RA-GRS provides geo-redundant storage with read access to the secondary region. This allows applications to read from the secondary region if the primary region becomes unavailable.",
            category: "Design data storage solutions (25-30%)",
            difficulty: "Medium",
            topic: "Data Protection"
          },
          {
            id: "az-305-12",
            question: "What is Azure Site Recovery primarily used for?",
            options: [
              "Data archiving",
              "Disaster recovery and business continuity",
              "Performance monitoring",
              "Cost optimization"
            ],
            correctAnswer: 1,
            explanation: "Azure Site Recovery provides disaster recovery as a service by replicating workloads from a primary site to a secondary location. It enables quick recovery in case of site failure.",
            category: "Design business continuity solutions (10-15%)",
            difficulty: "Easy",
            topic: "Disaster Recovery"
          },
          {
            id: "az-305-13",
            question: "Which high availability feature distributes VMs across multiple fault domains and update domains?",
            options: [
              "Availability Zones",
              "Availability Sets",
              "Virtual Machine Scale Sets",
              "Load Balancers"
            ],
            correctAnswer: 1,
            explanation: "Availability Sets distribute VMs across multiple fault domains (separate power and networking) and update domains (separate maintenance windows) within a datacenter, protecting against hardware failures and planned maintenance.",
            category: "Design business continuity solutions (10-15%)",
            difficulty: "Easy",
            topic: "High Availability"
          },
          {
            id: "az-305-14",
            question: "What is the Recovery Time Objective (RTO)?",
            options: [
              "The maximum acceptable amount of data loss measured in time",
              "The maximum acceptable downtime before business is impacted",
              "The time required to create a backup",
              "The frequency of backup operations"
            ],
            correctAnswer: 1,
            explanation: "RTO (Recovery Time Objective) defines the maximum acceptable downtime before business operations are significantly impacted. It determines how quickly you need to recover services after a disaster.",
            category: "Design business continuity solutions (10-15%)",
            difficulty: "Medium",
            topic: "Disaster Recovery"
          },
          {
            id: "az-305-15",
            question: "Which Azure Backup feature provides protection against ransomware by preventing deletion of backups?",
            options: [
              "Geo-redundant storage",
              "Soft delete",
              "Instant restore",
              "Cross-region restore"
            ],
            correctAnswer: 1,
            explanation: "Soft delete in Azure Backup retains deleted backup data for 14 additional days, allowing recovery if backups are deleted accidentally or maliciously (ransomware). This provides an additional layer of protection.",
            category: "Design business continuity solutions (10-15%)",
            difficulty: "Medium",
            topic: "Backup and Recovery"
          },
          {
            id: "az-305-16",
            question: "Which Azure Kubernetes Service (AKS) feature automatically adjusts the number of nodes based on resource requirements?",
            options: [
              "Horizontal pod autoscaler",
              "Cluster autoscaler",
              "Virtual nodes",
              "Azure Container Instances"
            ],
            correctAnswer: 1,
            explanation: "The cluster autoscaler automatically adjusts the number of nodes in an AKS cluster based on resource requirements and scheduled pods. It scales up when pods can't be scheduled and scales down when nodes are underutilized.",
            category: "Design infrastructure solutions (25-30%)",
            difficulty: "Medium",
            topic: "Compute Solutions"
          },
          {
            id: "az-305-17",
            question: "What is the recommended architecture pattern for building resilient microservices?",
            options: [
              "Monolithic architecture",
              "Three-tier architecture",
              "Event-driven architecture with message queues",
              "Client-server architecture"
            ],
            correctAnswer: 2,
            explanation: "Event-driven architecture with message queues (like Service Bus or Event Grid) enables loose coupling between microservices, improves resilience, and allows asynchronous communication that can handle temporary failures.",
            category: "Design infrastructure solutions (25-30%)",
            difficulty: "Medium",
            topic: "Application Architecture"
          },
          {
            id: "az-305-18",
            question: "Which Azure networking solution provides network-level isolation between Azure resources?",
            options: [
              "Network Security Groups (NSGs)",
              "Azure Firewall",
              "Virtual Network (VNet)",
              "Application Gateway"
            ],
            correctAnswer: 2,
            explanation: "Azure Virtual Networks (VNets) provide network-level isolation, allowing you to create isolated networks in Azure. Resources in a VNet can communicate privately while being isolated from resources in other VNets.",
            category: "Design infrastructure solutions (25-30%)",
            difficulty: "Easy",
            topic: "Network Solutions"
          },
          {
            id: "az-305-19",
            question: "What is Azure Event Grid primarily used for?",
            options: [
              "Storing event logs",
              "Building event-driven architectures with publish-subscribe patterns",
              "Monitoring application performance",
              "Managing user authentication"
            ],
            correctAnswer: 1,
            explanation: "Azure Event Grid is a fully managed event routing service that enables event-driven architectures using a publish-subscribe model. It simplifies event consumption and reduces costs by eliminating polling.",
            category: "Design infrastructure solutions (25-30%)",
            difficulty: "Easy",
            topic: "Messaging Architecture"
          },
          {
            id: "az-305-20",
            question: "Which tool is recommended for deploying complex Azure infrastructure with version control and collaboration?",
            options: [
              "Azure Portal",
              "Azure PowerShell scripts",
              "ARM templates or Bicep with Azure DevOps",
              "Azure CLI commands"
            ],
            correctAnswer: 2,
            explanation: "ARM templates or Bicep files with Azure DevOps (or GitHub Actions) provide infrastructure as code with version control, collaboration, automated testing, and deployment pipelines, making them ideal for complex infrastructure.",
            category: "Design infrastructure solutions (25-30%)",
            difficulty: "Medium",
            topic: "Application Architecture"
          }
        ]
      }
    ]
  }
];

// Helper function to get questions by platform and certification
export const getDemoQuestions = (platformId: string, certificationId: string, selectedTopics?: string[]): DemoQuestion[] => {
  const platform = demoQuestions.find(p => p.id === platformId);
  if (!platform) return [];
  
  const certification = platform.certifications.find(c => c.id === certificationId);
  if (!certification) return [];

  // If topics are selected, filter questions by those topics
  if (selectedTopics && selectedTopics.length > 0) {
    return certification.questions.filter(q => selectedTopics.includes(q.topic));
  }

  return certification.questions;
};

// Helper function to get all certifications for a platform
export const getDemoCertifications = (platformId: string): DemoCertification[] => {
  const platform = demoQuestions.find(p => p.id === platformId);
  return platform?.certifications || [];
};

// Helper function to get platform info
export const getDemoPlatform = (platformId: string): DemoPlatform | undefined => {
  return demoQuestions.find(p => p.id === platformId);
};

// Helper function to get all topics for a certification
export const getCertificationTopics = (platformId: string, certificationId: string): string[] => {
  const platform = demoQuestions.find(p => p.id === platformId);
  if (!platform) return [];
  
  const certification = platform.certifications.find(c => c.id === certificationId);
  if (!certification) return [];

  // Extract unique topics from questions
  const topics = [...new Set(certification.questions.map(q => q.topic))];
  return topics;
};
