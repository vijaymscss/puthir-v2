/**
 * Demo Questions for Free Test
 * 
 * Static sample questions for each cloud platform (AWS, Azure, GCP)
 * Organized by certification level and difficulty with topic categorization
 */

export interface DemoQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: string;
  topic: string; // The specific topic/domain for filtering
}

export interface DemoCertification {
  id: string;
  name: string;
  level: string;
  categories: string[]; // Available categories/topics for this certification
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
          "Cloud Concepts",
          "Security and Compliance",
          "Cloud Technology and Services",
          "Billing, Pricing, and Support"
        ],
        questions: [
          {
            id: "aws-cp-1",
            question: "Which AWS service provides a fully managed NoSQL database?",
            options: [
              "Amazon RDS",
              "Amazon DynamoDB",
              "Amazon Redshift",
              "Amazon Aurora"
            ],
            correctAnswer: 1,
            explanation: "Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. RDS and Aurora are relational databases, while Redshift is a data warehouse.",
            category: "Cloud Technology and Services",
            difficulty: "Easy",
            topic: "Database Services"
          },
          {
            id: "aws-cp-2",
            question: "According to the AWS Shared Responsibility Model, which of the following is AWS responsible for?",
            options: [
              "Customer data encryption",
              "Physical security of data centers",
              "Identity and Access Management (IAM) configuration",
              "Operating system patches on EC2 instances"
            ],
            correctAnswer: 1,
            explanation: "AWS is responsible for the security 'of' the cloud, including physical security of data centers, hardware, and the global infrastructure. Customers are responsible for security 'in' the cloud, including data encryption, IAM, and OS patches.",
            category: "Security and Compliance",
            difficulty: "Medium",
            topic: "Shared Responsibility Model"
          },
          {
            id: "aws-cp-3",
            question: "Which AWS service would you use to distribute content to users worldwide with low latency?",
            options: [
              "Amazon S3",
              "Amazon CloudFront",
              "AWS Direct Connect",
              "Amazon Route 53"
            ],
            correctAnswer: 1,
            explanation: "Amazon CloudFront is a content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds.",
            category: "Cloud Technology and Services",
            difficulty: "Easy",
            topic: "Networking Services"
          },
          {
            id: "aws-cp-4",
            question: "Which pricing model allows you to pay for compute capacity by the hour or second with no long-term commitments?",
            options: [
              "Reserved Instances",
              "Spot Instances",
              "On-Demand Instances",
              "Dedicated Hosts"
            ],
            correctAnswer: 2,
            explanation: "On-Demand Instances let you pay for compute capacity by the hour or second with no long-term commitments. This provides maximum flexibility and is ideal for short-term, irregular workloads.",
            category: "Billing, Pricing, and Support",
            difficulty: "Easy",
            topic: "Pricing Models"
          },
          {
            id: "aws-cp-5",
            question: "What is the primary benefit of using AWS CloudFormation?",
            options: [
              "Monitoring application performance",
              "Infrastructure as Code (IaC)",
              "Database migration",
              "Network traffic analysis"
            ],
            correctAnswer: 1,
            explanation: "AWS CloudFormation provides Infrastructure as Code (IaC), allowing you to model and provision AWS resources using templates. This enables version control, repeatability, and automation of infrastructure deployment.",
            category: "Cloud Technology and Services",
            difficulty: "Medium",
            topic: "Deployment and Operations"
          },
          {
            id: "aws-cp-6",
            question: "What is the main advantage of using AWS Regions?",
            options: [
              "Lower costs for all services",
              "Geographicredundancy and compliance",
              "Faster internet connections",
              "Unlimited storage capacity"
            ],
            correctAnswer: 1,
            explanation: "AWS Regions provide geographic redundancy, allowing you to deploy applications across multiple physical locations for disaster recovery and to meet data residency compliance requirements.",
            category: "Cloud Concepts",
            difficulty: "Easy",
            topic: "Global Infrastructure"
          }
        ]
      },
      {
        id: "solutions-architect-associate",
        name: "AWS Certified Solutions Architect - Associate",
        level: "Associate",
        categories: [
          "Design Secure Architectures",
          "Design Resilient Architectures",
          "Design High-Performing Architectures",
          "Design Cost-Optimized Architectures"
        ],
        questions: [
          {
            id: "aws-saa-1",
            question: "A company needs to store objects in S3 with automatic lifecycle transitions. Objects must be immediately accessible for 30 days, then transitioned to infrequent access for 60 days, and finally archived. Which S3 storage class progression would be MOST cost-effective?",
            options: [
              "S3 Standard → S3 One Zone-IA → S3 Glacier",
              "S3 Standard → S3 Standard-IA → S3 Glacier Deep Archive",
              "S3 Standard → S3 Intelligent-Tiering → S3 Glacier",
              "S3 Standard → S3 Standard-IA → S3 Glacier Flexible Retrieval"
            ],
            correctAnswer: 3,
            explanation: "The most cost-effective progression is S3 Standard (immediate access) → S3 Standard-IA (30-90 days) → S3 Glacier Flexible Retrieval (long-term archive with retrieval in minutes to hours). This balances access patterns with cost optimization.",
            category: "Design Cost-Optimized Architectures",
            difficulty: "Medium",
            topic: "Storage Solutions"
          },
          {
            id: "aws-saa-2",
            question: "An application requires a database that can scale horizontally across multiple regions with automatic multi-master replication. Which AWS service should be used?",
            options: [
              "Amazon RDS with Multi-AZ",
              "Amazon DynamoDB Global Tables",
              "Amazon Aurora Global Database",
              "Amazon DocumentDB"
            ],
            correctAnswer: 1,
            explanation: "Amazon DynamoDB Global Tables provide fully managed, multi-region, multi-master replication. It automatically replicates data across your chosen AWS Regions and enables local read and write performance.",
            category: "Design High-Performing Architectures",
            difficulty: "Hard",
            topic: "Database Solutions"
          },
          {
            id: "aws-saa-3",
            question: "A Solutions Architect needs to design a highly available web application across multiple Availability Zones. Which combination provides the highest availability?",
            options: [
              "Single EC2 instance with Auto Scaling",
              "Application Load Balancer with EC2 instances in multiple AZs",
              "Network Load Balancer with EC2 instances in a single AZ",
              "Classic Load Balancer with EC2 instances in multiple regions"
            ],
            correctAnswer: 1,
            explanation: "An Application Load Balancer distributing traffic to EC2 instances across multiple Availability Zones provides high availability, fault tolerance, and automatic failover within a region.",
            category: "Design Resilient Architectures",
            difficulty: "Medium",
            topic: "High Availability"
          },
          {
            id: "aws-saa-4",
            question: "Which AWS service combination would you use to implement a serverless data processing pipeline that triggers on S3 file uploads?",
            options: [
              "S3 → SNS → EC2",
              "S3 → Lambda → DynamoDB",
              "S3 → SQS → ECS",
              "S3 → EventBridge → EMR"
            ],
            correctAnswer: 1,
            explanation: "S3 event notifications can trigger Lambda functions directly, which can process the data and store results in DynamoDB. This is a fully serverless, cost-effective, and scalable solution.",
            category: "Design High-Performing Architectures",
            difficulty: "Medium",
            topic: "Compute Solutions"
          },
          {
            id: "aws-saa-5",
            question: "A company must ensure that all data stored in S3 is encrypted at rest and wants to maintain control over the encryption keys. Which solution meets this requirement?",
            options: [
              "S3 default encryption with Amazon S3-managed keys (SSE-S3)",
              "S3 encryption with AWS KMS-managed keys (SSE-KMS)",
              "S3 encryption with customer-provided keys (SSE-C)",
              "Client-side encryption only"
            ],
            correctAnswer: 1,
            explanation: "SSE-KMS allows you to use AWS KMS to manage encryption keys, providing full control over key rotation, access policies, and audit trails through CloudTrail. SSE-C requires managing keys yourself, while SSE-S3 doesn't provide key control.",
            category: "Design Secure Architectures",
            difficulty: "Hard",
            topic: "Data Security Controls"
          },
          {
            id: "aws-saa-6",
            question: "What is the best practice for designing disaster recovery with an RTO of 1 hour and RPO of 15 minutes?",
            options: [
              "Backup and restore",
              "Pilot light",
              "Warm standby",
              "Multi-site active-active"
            ],
            correctAnswer: 2,
            explanation: "Warm standby maintains a scaled-down version of a fully functional environment always running in the cloud, providing RTO/RPO within the required timeframe while balancing cost.",
            category: "Design Resilient Architectures",
            difficulty: "Hard",
            topic: "Disaster Recovery"
          }
        ]
      },
      {
        id: "developer-associate",
        name: "AWS Certified Developer - Associate",
        level: "Associate",
        categories: [
          "Development with AWS Services",
          "Security",
          "Deployment",
          "Troubleshooting and Optimization"
        ],
        questions: [
          {
            id: "aws-dev-1",
            question: "Which AWS service would you use to implement a distributed tracing solution for microservices?",
            options: [
              "AWS CloudWatch",
              "AWS X-Ray",
              "AWS CloudTrail",
              "AWS Config"
            ],
            correctAnswer: 1,
            explanation: "AWS X-Ray helps developers analyze and debug distributed applications, providing end-to-end tracing of requests as they travel through your application and showing a map of your application's underlying components.",
            category: "Troubleshooting and Optimization",
            difficulty: "Easy",
            topic: "Code Instrumentation"
          },
          {
            id: "aws-dev-2",
            question: "A Lambda function needs to access secrets stored in AWS Secrets Manager. What is the MOST secure way to grant this access?",
            options: [
              "Hard-code the secrets in environment variables",
              "Use an IAM role with permissions to read from Secrets Manager",
              "Store secrets in S3 and reference them",
              "Pass secrets as Lambda function parameters"
            ],
            correctAnswer: 1,
            explanation: "The most secure approach is to attach an IAM role to the Lambda function with permissions to read specific secrets from AWS Secrets Manager. The Lambda function can then retrieve secrets at runtime using the AWS SDK.",
            category: "Security",
            difficulty: "Medium",
            topic: "Sensitive Data Handling"
          },
          {
            id: "aws-dev-3",
            question: "Which DynamoDB feature would you use to ensure that write operations are not applied unless an item has not been modified by another process?",
            options: [
              "DynamoDB Streams",
              "Conditional Writes",
              "DynamoDB Accelerator (DAX)",
              "Global Secondary Index"
            ],
            correctAnswer: 1,
            explanation: "Conditional Writes allow you to specify conditions that must be met before a write operation proceeds, implementing optimistic locking to prevent concurrent modification issues.",
            category: "Development with AWS Services",
            difficulty: "Hard",
            topic: "Data Store Integration"
          },
          {
            id: "aws-dev-4",
            question: "What is the recommended way to deploy a new version of a Lambda function with minimal downtime?",
            options: [
              "Update the function code directly",
              "Use Lambda versions and aliases",
              "Create a new function and delete the old one",
              "Stop the function, update, and restart"
            ],
            correctAnswer: 1,
            explanation: "Lambda versions and aliases allow you to implement blue/green deployments. You can publish a new version, test it, and then update the alias to point to the new version, enabling instant rollback if needed.",
            category: "Deployment",
            difficulty: "Medium",
            topic: "Application Deployment"
          },
          {
            id: "aws-dev-5",
            question: "Which AWS CodePipeline action would you use to run automated tests before deploying to production?",
            options: [
              "Source action",
              "Deploy action",
              "Test action",
              "Approval action"
            ],
            correctAnswer: 2,
            explanation: "CodePipeline's Test action stage is specifically designed to run automated tests using services like AWS CodeBuild, ensuring code quality before deployment to production environments.",
            category: "Deployment",
            difficulty: "Easy",
            topic: "CI/CD Pipelines"
          },
          {
            id: "aws-dev-6",
            question: "How can you optimize Lambda function performance and reduce cold start times?",
            options: [
              "Increase memory allocation",
              "Use provisioned concurrency",
              "Deploy in multiple regions",
              "Use Lambda layers"
            ],
            correctAnswer: 1,
            explanation: "Provisioned concurrency keeps functions initialized and ready to respond in double-digit milliseconds, eliminating cold starts for critical workloads. Memory allocation helps but doesn't eliminate cold starts.",
            category: "Troubleshooting and Optimization",
            difficulty: "Medium",
            topic: "Performance Optimization"
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
        id: "az-900",
        name: "Microsoft Azure Fundamentals",
        level: "Foundational",
        categories: [
          "Cloud Concepts",
          "Azure Services",
          "Security and Compliance",
          "Azure Pricing and Support"
        ],
        questions: [
          {
            id: "azure-900-1",
            question: "Which Azure service provides a platform for running containerized applications without managing infrastructure?",
            options: [
              "Azure Virtual Machines",
              "Azure Container Instances",
              "Azure Functions",
              "Azure App Service"
            ],
            correctAnswer: 1,
            explanation: "Azure Container Instances (ACI) provides the fastest and simplest way to run containers in Azure without managing virtual machines and without adopting a higher-level orchestration service.",
            category: "Azure Services",
            difficulty: "Easy",
            topic: "Compute Services"
          },
          {
            id: "azure-900-2",
            question: "What type of cloud model allows organizations to maintain some resources on-premises while hosting others in the cloud?",
            options: [
              "Public cloud",
              "Private cloud",
              "Hybrid cloud",
              "Community cloud"
            ],
            correctAnswer: 2,
            explanation: "A hybrid cloud combines public cloud services with private cloud (on-premises) infrastructure, allowing data and applications to be shared between them. This provides greater flexibility and deployment options.",
            category: "Cloud Concepts",
            difficulty: "Easy",
            topic: "Cloud Models"
          },
          {
            id: "azure-900-3",
            question: "Which Azure service is used for creating and managing virtual networks in Azure?",
            options: [
              "Azure Load Balancer",
              "Azure Virtual Network (VNet)",
              "Azure ExpressRoute",
              "Azure Traffic Manager"
            ],
            correctAnswer: 1,
            explanation: "Azure Virtual Network (VNet) is the fundamental building block for your private network in Azure. It enables Azure resources to securely communicate with each other, the internet, and on-premises networks.",
            category: "Azure Services",
            difficulty: "Medium",
            topic: "Networking Services"
          },
          {
            id: "azure-900-4",
            question: "Which Azure pricing calculator helps estimate the cost savings of migrating to Azure?",
            options: [
              "Azure Pricing Calculator",
              "Total Cost of Ownership (TCO) Calculator",
              "Azure Cost Management",
              "Azure Advisor"
            ],
            correctAnswer: 1,
            explanation: "The TCO Calculator helps you estimate the cost savings you can realize by migrating your workloads to Azure, comparing on-premises infrastructure costs with Azure cloud costs.",
            category: "Azure Pricing and Support",
            difficulty: "Easy",
            topic: "Cost Management"
          },
          {
            id: "azure-900-5",
            question: "What does Azure Active Directory (Azure AD) primarily provide?",
            options: [
              "File storage",
              "Identity and access management",
              "Network security",
              "Database management"
            ],
            correctAnswer: 1,
            explanation: "Azure Active Directory (Azure AD) is Microsoft's cloud-based identity and access management service, helping employees sign in and access resources in external and internal resources.",
            category: "Security and Compliance",
            difficulty: "Medium",
            topic: "Identity Management"
          },
          {
            id: "azure-900-6",
            question: "Which Azure service provides Platform as a Service (PaaS) for hosting web applications?",
            options: [
              "Azure Virtual Machines",
              "Azure Container Instances",
              "Azure App Service",
              "Azure Kubernetes Service"
            ],
            correctAnswer: 2,
            explanation: "Azure App Service is a fully managed PaaS offering for building, deploying, and scaling web apps. It handles infrastructure management, allowing developers to focus on code.",
            category: "Azure Services",
            difficulty: "Easy",
            topic: "App Services"
          }
        ]
      },
      {
        id: "az-104",
        name: "Microsoft Azure Administrator",
        level: "Associate",
        categories: [
          "Virtual Machines",
          "Storage",
          "Networking",
          "Monitoring and Backup"
        ],
        questions: [
          {
            id: "azure-104-1",
            question: "You need to ensure high availability for virtual machines. Which Azure feature should you use?",
            options: [
              "Availability Sets",
              "Resource Groups",
              "Virtual Networks",
              "Storage Accounts"
            ],
            correctAnswer: 0,
            explanation: "Availability Sets ensure that VMs are distributed across multiple isolated hardware nodes in a cluster to protect against hardware and software failures. They provide 99.95% SLA when two or more VMs are deployed.",
            category: "Virtual Machines",
            difficulty: "Medium",
            topic: "High Availability"
          },
          {
            id: "azure-104-2",
            question: "Which Azure storage replication option provides the highest durability across multiple geographic regions?",
            options: [
              "Locally Redundant Storage (LRS)",
              "Zone-Redundant Storage (ZRS)",
              "Geo-Redundant Storage (GRS)",
              "Read-Access Geo-Redundant Storage (RA-GRS)"
            ],
            correctAnswer: 3,
            explanation: "RA-GRS provides the highest durability by replicating data to a secondary geographic region and providing read access to the data in the secondary location, offering 16 nines of durability.",
            category: "Storage",
            difficulty: "Hard",
            topic: "Data Redundancy"
          },
          {
            id: "azure-104-3",
            question: "What is the maximum number of virtual networks that can be peered together in Azure?",
            options: [
              "There is no limit",
              "100 per subscription",
              "500 per virtual network",
              "It depends on the region"
            ],
            correctAnswer: 2,
            explanation: "Azure allows up to 500 virtual network peerings per virtual network by default, though this limit can be increased by contacting Azure support.",
            category: "Networking",
            difficulty: "Hard",
            topic: "Network Peering"
          },
          {
            id: "azure-104-4",
            question: "Which Azure service would you use to automatically scale applications based on demand?",
            options: [
              "Azure Load Balancer",
              "Azure Traffic Manager",
              "Azure Autoscale",
              "Azure Front Door"
            ],
            correctAnswer: 2,
            explanation: "Azure Autoscale automatically adjusts the number of compute resources based on load, ensuring applications have the right resources at the right time while optimizing costs.",
            category: "Monitoring and Backup",
            difficulty: "Medium",
            topic: "Performance Optimization"
          },
          {
            id: "azure-104-5",
            question: "You need to move a VM from one subscription to another. What prerequisite must be met?",
            options: [
              "VMs cannot be moved between subscriptions",
              "Both subscriptions must be in the same Azure AD tenant",
              "The VM must be deallocated first",
              "The source subscription must be deleted"
            ],
            correctAnswer: 1,
            explanation: "To move resources between subscriptions, both subscriptions must exist in the same Azure Active Directory tenant. The VM doesn't need to be deallocated for the move.",
            category: "Virtual Machines",
            difficulty: "Medium",
            topic: "Resource Management"
          },
          {
            id: "azure-104-6",
            question: "Which Azure Backup feature allows you to recover individual files from a VM backup?",
            options: [
              "Snapshot restore",
              "File-level recovery",
              "Instant restore",
              "Cross-region restore"
            ],
            correctAnswer: 1,
            explanation: "File-level recovery allows you to browse and restore individual files and folders from VM backups without restoring the entire VM, saving time and resources.",
            category: "Monitoring and Backup",
            difficulty: "Easy",
            topic: "Backup Solutions"
          }
        ]
      }
    ]
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    icon: "/gcp_logo.svg",
    certifications: [
      {
        id: "cloud-digital-leader",
        name: "Cloud Digital Leader",
        level: "Foundational",
        categories: [
          "Cloud Concepts",
          "Google Cloud Services",
          "Security and Compliance",
          "Google Cloud Pricing"
        ],
        questions: [
          {
            id: "gcp-cdl-1",
            question: "Which Google Cloud service provides a fully managed relational database that is compatible with MySQL, PostgreSQL, and SQL Server?",
            options: [
              "Cloud Spanner",
              "Cloud SQL",
              "Bigtable",
              "Firestore"
            ],
            correctAnswer: 1,
            explanation: "Cloud SQL is a fully managed relational database service that supports MySQL, PostgreSQL, and SQL Server, handling maintenance tasks like backups, patches, and updates automatically.",
            category: "Google Cloud Services",
            difficulty: "Easy",
            topic: "Database Services"
          },
          {
            id: "gcp-cdl-2",
            question: "What is the primary benefit of Google Cloud's global network?",
            options: [
              "Lower storage costs",
              "Faster database queries",
              "Low latency and high throughput worldwide",
              "Automatic data encryption"
            ],
            correctAnswer: 2,
            explanation: "Google Cloud's global network provides low latency and high throughput by leveraging Google's private fiber network that spans the globe, ensuring fast data transfer between regions and to end users.",
            category: "Cloud Concepts",
            difficulty: "Easy",
            topic: "Global Infrastructure"
          },
          {
            id: "gcp-cdl-3",
            question: "Which Google Cloud service would you use for running containerized applications in a managed Kubernetes environment?",
            options: [
              "Compute Engine",
              "App Engine",
              "Google Kubernetes Engine (GKE)",
              "Cloud Run"
            ],
            correctAnswer: 2,
            explanation: "Google Kubernetes Engine (GKE) is a managed Kubernetes service that makes it easy to deploy, manage, and scale containerized applications using Kubernetes.",
            category: "Google Cloud Services",
            difficulty: "Medium",
            topic: "Compute Services"
          },
          {
            id: "gcp-cdl-4",
            question: "What does the principle of 'least privilege' mean in cloud security?",
            options: [
              "Users have access to all resources",
              "Users have minimal access needed to perform their job",
              "Only administrators have access to resources",
              "All resources are public by default"
            ],
            correctAnswer: 1,
            explanation: "The principle of least privilege means granting users, services, and applications only the minimum level of access necessary to perform their required tasks, reducing security risks.",
            category: "Security and Compliance",
            difficulty: "Easy",
            topic: "Security Best Practices"
          },
          {
            id: "gcp-cdl-5",
            question: "Which pricing model allows you to receive significant discounts for committing to use Google Cloud resources for 1 or 3 years?",
            options: [
              "On-demand pricing",
              "Committed use discounts",
              "Preemptible VMs",
              "Spot pricing"
            ],
            correctAnswer: 1,
            explanation: "Committed use discounts provide up to 57% discount for committing to use a certain amount of resources (vCPUs, memory, GPUs) for 1 or 3 years, ideal for stable, predictable workloads.",
            category: "Google Cloud Pricing",
            difficulty: "Medium",
            topic: "Cost Optimization"
          },
          {
            id: "gcp-cdl-6",
            question: "Which Google Cloud service provides serverless compute for running code in response to events?",
            options: [
              "Compute Engine",
              "Cloud Functions",
              "App Engine",
              "Cloud Run"
            ],
            correctAnswer: 1,
            explanation: "Cloud Functions is a serverless compute service that automatically runs your code in response to events, scaling from zero to handle demand without managing servers.",
            category: "Google Cloud Services",
            difficulty: "Easy",
            topic: "Serverless Computing"
          }
        ]
      },
      {
        id: "associate-cloud-engineer",
        name: "Associate Cloud Engineer",
        level: "Associate",
        categories: [
          "Cloud Tools",
          "Application Deployment",
          "Storage Management",
          "Networking",
          "Security"
        ],
        questions: [
          {
            id: "gcp-ace-1",
            question: "You need to deploy a web application that automatically scales based on traffic. Which Google Cloud service should you use?",
            options: [
              "Compute Engine with manual scaling",
              "App Engine Standard Environment",
              "Cloud Functions",
              "Cloud Storage"
            ],
            correctAnswer: 1,
            explanation: "App Engine Standard Environment provides automatic scaling, built-in security, and managed infrastructure, making it ideal for web applications that need to scale automatically based on traffic.",
            category: "Application Deployment",
            difficulty: "Medium",
            topic: "Auto Scaling"
          },
          {
            id: "gcp-ace-2",
            question: "Which command-line tool is used to interact with Google Cloud resources?",
            options: [
              "gcloud",
              "gsutil",
              "bq",
              "kubectl"
            ],
            correctAnswer: 0,
            explanation: "gcloud is the primary command-line tool for interacting with Google Cloud resources. gsutil is for Cloud Storage, bq for BigQuery, and kubectl for Kubernetes clusters.",
            category: "Cloud Tools",
            difficulty: "Easy",
            topic: "CLI Tools"
          },
          {
            id: "gcp-ace-3",
            question: "You need to ensure that a Compute Engine instance can access Cloud Storage without embedding credentials. What should you use?",
            options: [
              "API keys",
              "Service accounts",
              "OAuth 2.0",
              "Basic authentication"
            ],
            correctAnswer: 1,
            explanation: "Service accounts are the recommended way to authenticate applications and services. Attaching a service account to a Compute Engine instance allows it to access Cloud Storage without embedding credentials.",
            category: "Security",
            difficulty: "Medium",
            topic: "Authentication"
          },
          {
            id: "gcp-ace-4",
            question: "Which Cloud Storage class is most cost-effective for data accessed less than once a year?",
            options: [
              "Standard",
              "Nearline",
              "Coldline",
              "Archive"
            ],
            correctAnswer: 3,
            explanation: "Archive storage is the most cost-effective option for data accessed less than once a year, offering the lowest storage cost but with higher retrieval costs and a 365-day minimum storage duration.",
            category: "Storage Management",
            difficulty: "Hard",
            topic: "Storage Classes"
          },
          {
            id: "gcp-ace-5",
            question: "What is the purpose of VPC firewall rules in Google Cloud?",
            options: [
              "To encrypt data at rest",
              "To control traffic to and from VM instances",
              "To manage IAM permissions",
              "To optimize network performance"
            ],
            correctAnswer: 1,
            explanation: "VPC firewall rules allow you to control incoming and outgoing traffic to VM instances in your VPC network, implementing network-level security by allowing or denying traffic based on rules.",
            category: "Networking",
            difficulty: "Medium",
            topic: "Network Security"
          },
          {
            id: "gcp-ace-6",
            question: "Which Google Cloud service provides managed container orchestration?",
            options: [
              "Compute Engine",
              "Cloud Run",
              "Google Kubernetes Engine (GKE)",
              "App Engine"
            ],
            correctAnswer: 2,
            explanation: "Google Kubernetes Engine (GKE) provides managed Kubernetes clusters for deploying, managing, and scaling containerized applications, handling cluster management and maintenance.",
            category: "Application Deployment",
            difficulty: "Easy",
            topic: "Container Orchestration"
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
