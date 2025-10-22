export const cloudPractitioner = {
  "AWS_Cloud_Practitioner_Exam": {
    "Exam_Info": {
      "Exam_Code": "CLF-C02",
      "Passing_Score": 700,
      "Question_Count": 65,
      "Scored_Questions": 50,
      "Unscored_Questions": 15,
      "Question_Types": ["Multiple Choice", "Multiple Response"]
    },
    "Domains": [
      {
        "Domain": "Cloud Concepts",
        "Weight": "24%",
        "Topics": {
          "Cloud_Benefits": [
            "Understand AWS Cloud value proposition",
            "Recognize global infrastructure benefits (speed, reach, scalability)",
            "Understand high availability, elasticity, and agility"
          ],
          "Design_Principles": [
            "Understand AWS Well-Architected Framework",
            "Know the six pillars: operational excellence, security, reliability, performance efficiency, cost optimization, sustainability"
          ],
          "Migration_Strategies": [
            "Understand AWS Cloud Adoption Framework (CAF)",
            "Know migration benefits: reduced risk, improved ESG, revenue, and efficiency",
            "Identify migration tools and strategies (e.g., AWS Snowball, database replication)"
          ],
          "Cloud_Economics": [
            "Understand cost savings and variable vs fixed costs",
            "Identify automation and economies of scale benefits",
            "Understand rightsizing and BYOL (Bring Your Own License) models"
          ]
        }
      },
      {
        "Domain": "Security and Compliance",
        "Weight": "30%",
        "Topics": {
          "Shared_Responsibility_Model": [
            "Understand AWS and customer responsibilities",
            "Recognize how responsibilities shift by service (EC2, RDS, Lambda)",
            "Differentiate shared and individual responsibilities"
          ],
          "Security_Governance_Compliance": [
            "Understand AWS compliance and governance concepts",
            "Identify compliance tools: AWS Artifact, Audit Manager, Config, CloudTrail",
            "Understand encryption at rest and in transit",
            "Know key security services: GuardDuty, Security Hub, Shield, Inspector",
            "Recognize how AWS services support compliance across regions and industries"
          ],
          "Access_Management": [
            "Understand IAM, IAM Identity Center (SSO), MFA, and principle of least privilege",
            "Protect root user and credentials (Secrets Manager, Systems Manager)",
            "Define IAM users, groups, roles, and managed/custom policies"
          ],
          "Security_Resources": [
            "Understand AWS security features and third-party tools via Marketplace",
            "Use AWS security documentation and resources (Security Center, Blog, Trusted Advisor)",
            "Identify services that detect and remediate security issues (e.g., Firewall Manager, WAF)"
          ]
        }
      },
      {
        "Domain": "Cloud Technology and Services",
        "Weight": "34%",
        "Topics": {
          "Deployment_And_Operations": [
            "Understand ways to access AWS (Console, CLI, SDK, APIs, IaC)",
            "Recognize cloud, hybrid, and on-premises deployment models"
          ],
          "Global_Infrastructure": [
            "Understand Regions, Availability Zones, and Edge Locations",
            "Describe high availability and multi-region benefits (disaster recovery, low latency)"
          ],
          "Compute_Services": [
            "Understand EC2 instance types (compute, memory, storage optimized)",
            "Recognize containers (ECS, EKS) and serverless options (Lambda, Fargate)",
            "Understand load balancing and auto scaling concepts"
          ],
          "Database_Services": [
            "Identify relational databases (RDS, Aurora)",
            "Identify NoSQL databases (DynamoDB)",
            "Understand memory-based databases (ElastiCache)",
            "Recognize database migration tools (DMS, SCT)"
          ],
          "Networking_Services": [
            "Understand VPC components (subnets, gateways)",
            "Recognize Route 53, VPN, and Direct Connect uses",
            "Understand security in networking (NACLs, Security Groups, Inspector)"
          ],
          "Storage_Services": [
            "Understand S3 object storage and storage classes",
            "Identify block (EBS) and file (EFS, FSx) storage",
            "Recognize lifecycle policies, AWS Backup, and cached systems (Storage Gateway)"
          ],
          "AI_ML_And_Analytics": [
            "Understand AI/ML services (SageMaker, Lex, Kendra, Polly)",
            "Recognize analytics tools (Athena, Glue, Kinesis, QuickSight)"
          ],
          "Other_AWS_Services": [
            "Application Integration (EventBridge, SNS, SQS)",
            "Business Applications (Connect, SES)",
            "Developer Tools (CodeBuild, CodePipeline, X-Ray)",
            "End User Computing (AppStream 2.0, WorkSpaces, Secure Browser)",
            "Frontend & Mobile (Amplify, AppSync)",
            "IoT (IoT Core)",
            "Customer Enablement (AWS Support)"
          ]
        }
      },
      {
        "Domain": "Billing, Pricing, and Support",
        "Weight": "12%",
        "Topics": {
          "Pricing_Models": [
            "Understand compute purchasing options (On-Demand, Reserved, Spot, Savings Plans, Dedicated Hosts)",
            "Understand storage tiers and pricing",
            "Recognize cost factors for data transfer (Region-to-Region, In-Region)"
          ],
          "Billing_And_Cost_Management": [
            "Understand AWS Budgets, Cost Explorer, and Pricing Calculator",
            "Use AWS Organizations for consolidated billing and allocation",
            "Understand cost allocation tags and Cost and Usage Reports"
          ],
          "Support_And_Resources": [
            "Identify AWS Support plans (Basic, Developer, Business, Enterprise)",
            "Locate AWS whitepapers, blogs, and documentation (Prescriptive Guidance, re:Post, Knowledge Center)",
            "Recognize the role of AWS Partners, Marketplace, and Professional Services",
            "Identify tools for health and optimization (Trusted Advisor, Health Dashboard, Health API)"
          ]
        }
      }
    ],
    "Core_Services": {
      "Compute": ["EC2", "Lightsail", "Elastic Beanstalk", "Batch", "Outposts"],
      "Containers": ["ECR", "ECS", "EKS"],
      "Storage": ["S3", "EBS", "EFS", "FSx", "Glacier", "Backup"],
      "Database": ["RDS", "Aurora", "DynamoDB", "ElastiCache", "Neptune", "DocumentDB"],
      "Networking": ["VPC", "Route 53", "CloudFront", "Global Accelerator", "Direct Connect", "PrivateLink", "Transit Gateway", "VPN"],
      "Security": [
        "IAM",
        "IAM Identity Center",
        "KMS",
        "GuardDuty",
        "Security Hub",
        "Shield",
        "WAF",
        "Macie",
        "Inspector",
        "Artifact",
        "Audit Manager",
        "Secrets Manager"
      ],
      "Analytics_And_AI_ML": [
        "Athena",
        "Glue",
        "Kinesis",
        "Redshift",
        "QuickSight",
        "SageMaker",
        "Lex",
        "Kendra",
        "Polly",
        "Textract",
        "Translate"
      ],
      "Developer_Tools": ["CodeBuild", "CodePipeline", "X-Ray", "CLI", "CloudFormation", "Config", "CloudWatch", "Systems Manager"],
      "Support_And_Management": [
        "Trusted Advisor",
        "Health Dashboard",
        "Organizations",
        "Service Catalog",
        "Well-Architected Tool",
        "Control Tower",
        "License Manager"
      ]
    },
    "Study_Priorities": [
      "Understand core AWS Cloud concepts and Well-Architected Framework pillars",
      "Master shared responsibility and security best practices",
      "Learn core AWS services — compute, storage, database, and networking",
      "Understand IAM fundamentals and access control models",
      "Study AWS billing, pricing models, and cost management tools",
      "Know how to locate AWS documentation, whitepapers, and support resources",
      "Understand AI/ML, analytics, and additional AWS service categories at a high level"
    ]
  }
}


export const cloudDeveloper={
  "AWS_Developer_Associate_Exam": {
    "Exam_Info": {
      "Exam_Code": "DVA-C02",
      "Passing_Score": 720,
      "Question_Count": 65,
      "Scored_Questions": 50,
      "Unscored_Questions": 15,
      "Question_Types": ["Multiple Choice", "Multiple Response"]
    },
    "Domains": [
      {
        "Domain": "Development with AWS Services",
        "Weight": "32%",
        "Topics": {
          "Application_Development": [
            "Event-driven, microservices, monolithic, and orchestration patterns",
            "Idempotency and fault-tolerant patterns (exponential backoff, DLQs)",
            "Stateful vs Stateless and tightly vs loosely coupled components",
            "Synchronous vs Asynchronous communication",
            "Developing and testing resilient applications using SDKs and APIs",
            "Unit testing with AWS SAM or similar frameworks"
          ],
          "AWS_Lambda_Development": [
            "Event source mappings and triggers",
            "Configuring environment variables, memory, concurrency, timeouts, and handlers",
            "Error handling (DLQs, Lambda Destinations)",
            "Accessing private resources in VPC",
            "Integration with other AWS services",
            "Optimizing Lambda performance"
          ],
          "Data_Store_Integration": [
            "Working with relational and NoSQL databases (RDS, DynamoDB)",
            "CRUD operations and consistency models",
            "DynamoDB partition keys and indexing",
            "Caching strategies (write-through, lazy loading, TTL)",
            "S3 storage tiers and lifecycle management",
            "Serialization/deserialization and data lifecycle handling"
          ]
        }
      },
      {
        "Domain": "Security",
        "Weight": "26%",
        "Topics": {
          "Authentication_Authorization": [
            "Identity Federation (SAML, OIDC, Cognito)",
            "Bearer Tokens (JWT, OAuth, AWS STS)",
            "IAM Roles, Policies, and Resource-Based Access",
            "RBAC and ACL-based authorization",
            "Principle of Least Privilege and Policy Management",
            "Federated Access using Cognito or IAM"
          ],
          "Encryption": [
            "Encryption at rest and in transit",
            "Client-side vs Server-side Encryption",
            "AWS KMS Key Management (Managed vs Customer Keys)",
            "Certificate Management (ACM, Private CA)",
            "Key Rotation and Cross-Account Encryption"
          ],
          "Sensitive_Data_Handling": [
            "Data Classification (PII, PHI)",
            "Secrets Management (Secrets Manager, Parameter Store)",
            "Encryption of Environment Variables",
            "Secure Credential Handling and Sanitization"
          ]
        }
      },
      {
        "Domain": "Deployment",
        "Weight": "24%",
        "Topics": {
          "Prepare_Artifacts": [
            "Application configuration via AppConfig, Secrets Manager, Parameter Store",
            "Lambda deployment packages, layers, and container images",
            "Version control with Git",
            "Organizing directories and dependency management"
          ],
          "Testing": [
            "Integration testing with mock endpoints",
            "Lambda versions and aliases for testing",
            "Testing with API Gateway stages and environments",
            "Deploying updates with AWS SAM or CloudFormation"
          ],
          "Automated_Testing": [
            "Continuous Integration/Continuous Delivery (CI/CD) workflows",
            "Automated unit and integration tests",
            "Application test events and mock payloads",
            "Managing environments for testing (Amplify, Copilot, Lambda Aliases)"
          ],
          "CI_CD_Deployment": [
            "AWS CodePipeline, CodeBuild, CodeDeploy, and CodeArtifact",
            "Deployments using CloudFormation, CDK, SAM, Amplify",
            "Deployment Strategies (Blue/Green, Canary, Rolling)",
            "Application Configuration Management (AppConfig, Secrets Manager)",
            "Rollback and Version Control with branches and tags"
          ]
        }
      },
      {
        "Domain": "Troubleshooting and Optimization",
        "Weight": "18%",
        "Topics": {
          "Root_Cause_Analysis": [
            "Logging and Monitoring (CloudWatch, X-Ray)",
            "Analyzing logs with CloudWatch Logs Insights",
            "Identifying and debugging SDK exceptions",
            "HTTP error codes and service failures",
            "Custom metrics (Embedded Metric Format - EMF)",
            "Troubleshooting deployment issues"
          ],
          "Observability": [
            "Distributed Tracing and Structured Logging",
            "Emitting custom metrics and annotations",
            "Monitoring application health using dashboards",
            "Notifications and alerts for quota or deployment events"
          ],
          "Performance_Optimization": [
            "Caching and Concurrency tuning",
            "Message Queuing (SQS, SNS)",
            "Profiling and memory optimization for Lambda",
            "Using subscription filters and optimizing event throughput"
          ]
        }
      }
    ],
    "Core_Services": {
      "Compute": ["EC2", "Lambda", "Elastic Beanstalk", "AWS SAM"],
      "Containers": ["ECR", "ECS", "EKS", "Copilot"],
      "Storage": ["S3", "EBS", "EFS", "S3 Glacier"],
      "Database": ["RDS", "Aurora", "DynamoDB", "ElastiCache", "MemoryDB"],
      "Networking": ["API Gateway", "CloudFront", "Route 53", "VPC", "ELB"],
      "Security": ["IAM", "KMS", "Cognito", "Secrets Manager", "STS", "ACM", "Private CA", "WAF"],
      "Developer_Tools": [
        "CodeBuild",
        "CodeDeploy",
        "CodePipeline",
        "CodeArtifact",
        "Amplify",
        "CloudFormation",
        "CDK",
        "AppConfig",
        "CloudWatch",
        "X-Ray"
      ]
    },
    "Study_Priorities": [
      "Understand Lambda deeply – configuration, triggers, and event handling",
      "Master IAM, Cognito, and security token-based authentication",
      "Learn deployment automation using CI/CD pipelines (CodePipeline, CodeDeploy)",
      "Practice CloudFormation, SAM, and CDK templates for IaC",
      "Gain hands-on experience with DynamoDB, S3, and API Gateway integrations",
      "Focus on logging, debugging, and monitoring using CloudWatch and X-Ray",
      "Understand caching, retries, and optimization for performance and cost"
    ]
  }
}



export const solutionArchitect={
  "AWS_Solutions_Architect_Associate_Exam": {
    "Exam_Info": {
      "Exam_Code": "SAA-C03",
      "Passing_Score": 720,
      "Question_Count": 65,
      "Scored_Questions": 50,
      "Unscored_Questions": 15,
      "Question_Types": ["Multiple Choice", "Multiple Response"]
    },
    "Domains": [
      {
        "Domain": "Design Secure Architectures",
        "Weight": "30%",
        "Topics": {
          "Secure_Access": [
            "IAM Users, Groups, Roles, and Policies",
            "MFA and Root User Protection",
            "Cross-Account Access and Role Switching",
            "Federation with AWS IAM Identity Center (SSO)",
            "AWS Control Tower and Service Control Policies (SCPs)"
          ],
          "Secure_Workloads": [
            "VPC Design (Security Groups, NACLs, Route Tables, NAT Gateway)",
            "Application Security and Credential Management",
            "Use of AWS WAF, Shield, GuardDuty, Macie, Cognito, Secrets Manager",
            "VPN and Direct Connect Security"
          ],
          "Data_Security": [
            "Encryption at Rest (KMS) and in Transit (ACM/TLS)",
            "Data Retention, Classification, and Governance",
            "Backup, Replication, and Recovery Strategies",
            "Key Rotation and Certificate Renewal"
          ]
        }
      },
      {
        "Domain": "Design Resilient Architectures",
        "Weight": "26%",
        "Topics": {
          "Scalable_Architectures": [
            "Microservices and Event-Driven Design",
            "Loose Coupling with SQS, SNS, EventBridge, Step Functions",
            "Containerization (ECS, EKS, Fargate)",
            "Load Balancing (ALB, NLB)",
            "Serverless Workloads and Stateless Design"
          ],
          "Fault_Tolerant_Architectures": [
            "Multi-AZ and Multi-Region Deployments",
            "Disaster Recovery Strategies (Backup/Restore, Pilot Light, Warm Standby, Active-Active)",
            "Failover and Replication",
            "Monitoring and Health Checks (CloudWatch, X-Ray)",
            "Automated Recovery and Immutable Infrastructure"
          ]
        }
      },
      {
        "Domain": "Design High-Performing Architectures",
        "Weight": "24%",
        "Topics": {
          "Storage": [
            "S3, EBS, EFS, FSx - Use Cases and Performance",
            "Hybrid Storage and Scaling"
          ],
          "Compute": [
            "EC2 Instance Types and Auto Scaling",
            "Lambda, Fargate, Batch, EMR",
            "Distributed Computing and Edge Processing"
          ],
          "Database": [
            "RDS, Aurora, DynamoDB, ElastiCache, Redshift",
            "Replication, Caching, and Capacity Planning",
            "Database Type Selection (Relational vs Non-Relational)"
          ],
          "Networking": [
            "VPC Design, Subnets, Routing, IP Planning",
            "CloudFront, Global Accelerator, Route 53",
            "Hybrid Connectivity (VPN, Direct Connect, PrivateLink)"
          ],
          "Data_Ingestion_And_Processing": [
            "Kinesis, Glue, Athena, QuickSight, EMR",
            "Data Transfer (DataSync, Storage Gateway)",
            "Data Lakes, Streaming, Transformation (.csv → .parquet)"
          ]
        }
      },
      {
        "Domain": "Design Cost-Optimized Architectures",
        "Weight": "20%",
        "Topics": {
          "Storage_Cost_Optimization": [
            "S3 Lifecycle Policies and Tiering (Standard, IA, Glacier)",
            "EBS/EFS/FSx Right-Sizing",
            "Backup and Archival Strategies",
            "Data Transfer Optimization"
          ],
          "Compute_Cost_Optimization": [
            "Spot, Reserved, and Savings Plans",
            "Serverless and Container-Based Optimization",
            "Auto Scaling and Instance Rightsizing",
            "Multi-Account Billing and Cost Allocation Tags"
          ],
          "Database_Cost_Optimization": [
            "Aurora Serverless and DynamoDB On-Demand",
            "Backup and Retention Policies",
            "Replication and Caching Strategies",
            "Migration Between Database Engines"
          ],
          "Network_Cost_Optimization": [
            "NAT Gateway vs NAT Instance",
            "VPC Endpoints and Route Optimization",
            "Direct Connect vs VPN Cost Comparison",
            "Use of CDN (CloudFront) and Edge Caching"
          ]
        }
      }
    ],
    "Core_Services": {
      "Compute": ["EC2", "Lambda", "Fargate", "Elastic Beanstalk", "Batch"],
      "Storage": ["S3", "EBS", "EFS", "FSx", "Glacier", "Backup"],
      "Database": ["RDS", "Aurora", "DynamoDB", "Redshift", "ElastiCache"],
      "Networking": ["VPC", "Route 53", "CloudFront", "Global Accelerator", "Direct Connect", "VPN"],
      "Security": ["IAM", "KMS", "Shield", "WAF", "GuardDuty", "Macie", "Security Hub"],
      "Monitoring_And_Management": ["CloudWatch", "CloudTrail", "Config", "Trusted Advisor", "Well-Architected Tool"]
    },
    "Study_Priorities": [
      "Master VPC Design and Networking Fundamentals",
      "Understand IAM Deeply (Roles, Policies, Federation)",
      "Learn Storage and Database Selection Trade-offs",
      "Practice Designing Resilient and Fault-Tolerant Systems",
      "Focus on Cost Optimization Techniques",
      "Review the AWS Well-Architected Framework"
    ]
  }
}

