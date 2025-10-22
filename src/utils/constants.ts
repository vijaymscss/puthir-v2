// Comprehensive AWS exam data - consolidated from all sources
export interface ExamDomain {
  domain: string;
  topics: string[];
}

export interface ExamType {
  id: string;
  name: string;
  level: string;
  description: string;
  duration: string;
  questionCount: string;
  examCode?: string;
  passingScore?: number;
  categories: string[];
  detailedSyllabus?: ExamDomain[];
}

export interface CloudPlatform {
  id: string;
  name: string;
  description: string;
  icon: string;
  examTypes: ExamType[];
}

// AWS exam topics organized with comprehensive exam data
export const examTopics: CloudPlatform[] = [
  {
    id: "aws",
    name: "AWS (Amazon Web Services)",
    description: "Comprehensive AWS cloud computing certification and skill development",
    icon: "/aws_logo.svg",
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
              "Understand AWS Cloud value proposition",
              "Recognize global infrastructure benefits (speed, reach, scalability)",
              "Understand high availability, elasticity, and agility",
              "Understand AWS Well-Architected Framework",
              "Know the six pillars: operational excellence, security, reliability, performance efficiency, cost optimization, sustainability",
              "Understand AWS Cloud Adoption Framework (CAF)",
              "Know migration benefits: reduced risk, improved ESG, revenue, and efficiency",
              "Identify migration tools and strategies (e.g., AWS Snowball, database replication)",
              "Understand cost savings and variable vs fixed costs",
              "Identify automation and economies of scale benefits",
              "Understand rightsizing and BYOL (Bring Your Own License) models"
            ]
          },
          {
            domain: "Security and Compliance (30%)",
            topics: [
              "Understand AWS and customer responsibilities",
              "Recognize how responsibilities shift by service (EC2, RDS, Lambda)",
              "Differentiate shared and individual responsibilities",
              "Understand AWS compliance and governance concepts",
              "Identify compliance tools: AWS Artifact, Audit Manager, Config, CloudTrail",
              "Understand encryption at rest and in transit",
              "Know key security services: GuardDuty, Security Hub, Shield, Inspector",
              "Recognize how AWS services support compliance across regions and industries",
              "Understand IAM, IAM Identity Center (SSO), MFA, and principle of least privilege",
              "Protect root user and credentials (Secrets Manager, Systems Manager)",
              "Define IAM users, groups, roles, and managed/custom policies",
              "Understand AWS security features and third-party tools via Marketplace",
              "Use AWS security documentation and resources (Security Center, Blog, Trusted Advisor)",
              "Identify services that detect and remediate security issues (e.g., Firewall Manager, WAF)"
            ]
          },
          {
            domain: "Cloud Technology and Services (34%)",
            topics: [
              "Understand ways to access AWS (Console, CLI, SDK, APIs, IaC)",
              "Recognize cloud, hybrid, and on-premises deployment models",
              "Understand Regions, Availability Zones, and Edge Locations",
              "Describe high availability and multi-region benefits (disaster recovery, low latency)",
              "Understand EC2 instance types (compute, memory, storage optimized)",
              "Recognize containers (ECS, EKS) and serverless options (Lambda, Fargate)",
              "Understand load balancing and auto scaling concepts",
              "Identify relational databases (RDS, Aurora)",
              "Identify NoSQL databases (DynamoDB)",
              "Understand memory-based databases (ElastiCache)",
              "Recognize database migration tools (DMS, SCT)",
              "Understand VPC components (subnets, gateways)",
              "Recognize Route 53, VPN, and Direct Connect uses",
              "Understand security in networking (NACLs, Security Groups, Inspector)",
              "Understand S3 object storage and storage classes",
              "Identify block (EBS) and file (EFS, FSx) storage",
              "Recognize lifecycle policies, AWS Backup, and cached systems (Storage Gateway)",
              "Understand AI/ML services (SageMaker, Lex, Kendra, Polly)",
              "Recognize analytics tools (Athena, Glue, Kinesis, QuickSight)"
            ]
          },
          {
            domain: "Billing, Pricing, and Support (12%)",
            topics: [
              "Compare AWS pricing models (On-Demand, Reserved, Spot, Dedicated)",
              "Recognize pricing tools (Cost Explorer, Pricing Calculator, Budgets)",
              "Understand cost allocation tags and resource grouping",
              "Identify resources for billing support (Billing Console, Cost and Billing API)",
              "Recognize technical resources (documentation, whitepapers, Knowledge Center)",
              "Identify AWS Support tiers and their features (Basic, Developer, Business, Enterprise)",
              "Understand AWS Partner Network (APN) and Marketplace solutions"
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
              "Write code for serverless applications (Lambda)",
              "Use AWS SDKs and CLI effectively",
              "Implement application programming interfaces (APIs) using API Gateway",
              "Use data stores in application development (DynamoDB, S3, RDS)",
              "Configure application environments and services"
            ]
          },
          {
            domain: "Security (26%)",
            topics: [
              "Implement authentication and authorization for applications and AWS services",
              "Use AWS Identity and Access Management (IAM) effectively",
              "Implement encryption using AWS services (KMS, CloudHSM)",
              "Manage sensitive data in application code",
              "Use AWS Secrets Manager and Parameter Store",
              "Implement secure application communication"
            ]
          },
          {
            domain: "Deployment (24%)",
            topics: [
              "Prepare application artifacts to be deployed to AWS",
              "Test applications in development environments",
              "Automate deployment testing",
              "Use AWS CodeCommit, CodeBuild, CodeDeploy, and CodePipeline",
              "Deploy serverless applications using SAM and CloudFormation",
              "Implement blue/green and canary deployments"
            ]
          },
          {
            domain: "Troubleshooting and Optimization (18%)",
            topics: [
              "Assist in root cause analysis",
              "Instrument code for observability",
              "Optimize applications by using AWS services and features",
              "Use CloudWatch for monitoring and logging",
              "Implement distributed tracing with X-Ray",
              "Debug and troubleshoot application issues"
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
              "Determine appropriate data security controls",
              "Implement secure multi-tier architectures",
              "Design secure network architectures",
              "Apply AWS security services appropriately"
            ]
          },
          {
            domain: "Design Resilient Architectures (26%)",
            topics: [
              "Design scalable and loosely coupled architectures",
              "Design highly available and fault-tolerant architectures",
              "Choose appropriate resilient storage solutions",
              "Design decoupling mechanisms using AWS services",
              "Implement disaster recovery strategies",
              "Plan for business continuity"
            ]
          },
          {
            domain: "Design High-Performing Architectures (24%)",
            topics: [
              "Determine high-performing and scalable storage solutions",
              "Design high-performing and elastic compute solutions",
              "Determine high-performing database solutions",
              "Determine high-performing and scalable network architectures",
              "Choose appropriate AWS services for performance optimization",
              "Design for global performance and low latency"
            ]
          },
          {
            domain: "Design Cost-Optimized Architectures (20%)",
            topics: [
              "Design cost-optimized storage solutions",
              "Design cost-optimized compute solutions",
              "Identify cost optimization strategies for databases",
              "Choose cost-effective network configurations",
              "Implement cost monitoring and governance",
              "Apply AWS cost management best practices"
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
              "Implement data ingestion solutions using AWS services",
              "Transform and process data using AWS Glue and EMR",
              "Orchestrate data pipelines using Step Functions and EventBridge",
              "Handle streaming data with Kinesis and Lambda",
              "Design batch and real-time data processing workflows",
              "Implement data validation and quality checks"
            ]
          },
          {
            domain: "Data Store Management (26%)",
            topics: [
              "Choose appropriate data stores for different use cases",
              "Understand data cataloging systems (AWS Glue Data Catalog)",
              "Manage data lifecycle and archival strategies",
              "Design data lakes and data warehouses",
              "Implement data partitioning and optimization strategies",
              "Configure data replication and backup solutions"
            ]
          },
          {
            domain: "Data Operations and Support (22%)",
            topics: [
              "Automate data processing systems",
              "Monitor and troubleshoot data pipelines",
              "Optimize cost and performance of data solutions",
              "Implement logging and alerting for data workflows",
              "Manage data pipeline failures and recovery",
              "Scale data processing based on demand"
            ]
          },
          {
            domain: "Data Security and Governance (18%)",
            topics: [
              "Apply authentication and authorization for data access",
              "Ensure data encryption and privacy compliance",
              "Implement monitoring and auditing for data access",
              "Design data lineage and metadata management",
              "Apply data classification and tagging strategies",
              "Implement data retention and deletion policies"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    description: "Microsoft Azure cloud platform certification and skill development",
    icon: "/azure_logo.svg",
    examTypes: [
      {
        id: "azure-fundamentals",
        name: "Azure Fundamentals",
        level: "Foundational",
        description: "Foundational understanding of Azure cloud concepts, services, and terminology",
        duration: "60 minutes",
        questionCount: "40-60 questions",
        examCode: "AZ-900",
        passingScore: 700,
        categories: [
          "Cloud Concepts (25-30%)",
          "Azure Architecture and Services (35-40%)",
          "Azure Management and Governance (30-35%)"
        ],
        detailedSyllabus: [
          {
            domain: "Cloud Concepts (25-30%)",
            topics: [
              "Define cloud computing and its benefits",
              "Describe the shared responsibility model",
              "Define cloud service types (IaaS, PaaS, SaaS)",
              "Identify appropriate use cases for each cloud service type",
              "Describe the consumption-based model",
              "Compare cloud pricing models",
              "Describe serverless computing",
              "Identify the benefits and considerations of using cloud services"
            ]
          },
          {
            domain: "Azure Architecture and Services (35-40%)",
            topics: [
              "Describe Azure regions, region pairs, and sovereign regions",
              "Describe availability zones and availability sets",
              "Describe Azure datacenters and Azure resources",
              "Describe Azure management infrastructure (resource groups, subscriptions)",
              "Describe Azure compute services (VMs, App Service, Container Instances, AKS, Functions)",
              "Describe Azure networking services (Virtual Network, VPN Gateway, ExpressRoute, DNS)",
              "Describe Azure storage services (Blob, File, Queue, Table, Disk)",
              "Describe Azure database services (Cosmos DB, SQL Database, MySQL, PostgreSQL)",
              "Describe Azure identity services (Azure AD, MFA, SSO)"
            ]
          },
          {
            domain: "Azure Management and Governance (30-35%)",
            topics: [
              "Describe cost management in Azure (factors affecting costs, pricing calculator)",
              "Describe features and tools for governance and compliance (Azure Blueprint, Policy, locks)",
              "Describe features and tools for managing and deploying Azure resources (portal, CLI, PowerShell, ARM templates)",
              "Describe monitoring tools in Azure (Azure Advisor, Azure Monitor, Azure Service Health)",
              "Describe Azure Service Level Agreements (SLAs) and service lifecycles",
              "Describe privacy, compliance, and data protection standards in Azure"
            ]
          }
        ]
      },
      {
        id: "azure-developer-associate",
        name: "Azure Developer Associate",
        level: "Associate",
        description: "Demonstrates expertise in developing cloud applications and services on Microsoft Azure",
        duration: "150 minutes",
        questionCount: "40-60 questions",
        examCode: "AZ-204",
        passingScore: 700,
        categories: [
          "Develop Azure compute solutions (25-30%)",
          "Develop for Azure storage (15-20%)",
          "Implement Azure security (20-25%)",
          "Monitor, troubleshoot, and optimize Azure solutions (15-20%)",
          "Connect to and consume Azure services and third-party services (15-20%)"
        ],
        detailedSyllabus: [
          {
            domain: "Develop Azure compute solutions (25-30%)",
            topics: [
              "Implement solutions that use virtual machines (VMs)",
              "Create and deploy ARM templates",
              "Create container images for solutions",
              "Publish solutions to Azure Container Registry",
              "Run containers by using Azure Container Instances or AKS",
              "Create Azure App Service Web Apps",
              "Configure settings including SSL, API settings, and connection strings",
              "Implement autoscaling rules including scheduled autoscaling and scaling by operational or system metrics",
              "Create Azure Functions apps and implement input and output bindings"
            ]
          },
          {
            domain: "Develop for Azure storage (15-20%)",
            topics: [
              "Develop solutions that use Cosmos DB storage",
              "Develop solutions that use blob storage",
              "Develop solutions that use Azure Files",
              "Implement authentication and data operations",
              "Implement storage policies and data lifecycle management",
              "Configure Azure Cognitive Search"
            ]
          },
          {
            domain: "Implement Azure security (20-25%)",
            topics: [
              "Implement user authentication and authorization",
              "Implement secure cloud solutions using Azure Key Vault",
              "Implement managed identities for Azure resources",
              "Implement authentication by using certificates, forms-based authentication, tokens, or Windows-integrated authentication",
              "Implement OAuth2 authentication and authorization code flow",
              "Implement multi-factor authentication by using Azure AD"
            ]
          },
          {
            domain: "Monitor, troubleshoot, and optimize Azure solutions (15-20%)",
            topics: [
              "Configure Application Insights and interpret metrics, logs, and traces",
              "Implement conditional access policies including multifactor authentication",
              "Implement code for handling transient faults",
              "Instrument solutions to support monitoring and logging using Azure Monitor",
              "Integrate caching and content delivery within solutions",
              "Implement autoscaling rules and patterns"
            ]
          },
          {
            domain: "Connect to and consume Azure services and third-party services (15-20%)",
            topics: [
              "Implement API Management policies for APIs",
              "Implement solutions that use Azure Relay, Azure Data Factory, Azure Logic Apps",
              "Implement solutions that use Azure Service Bus and Azure Event Grid",
              "Implement solutions that use Microsoft Graph",
              "Develop event-based solutions using Azure Event Hubs and Azure Notification Hubs"
            ]
          }
        ]
      },
      {
        id: "azure-solutions-architect-expert",
        name: "Azure Solutions Architect Expert",
        level: "Expert",
        description: "Demonstrates advanced skills in designing and implementing solutions that run on Microsoft Azure",
        duration: "150 minutes",
        questionCount: "40-60 questions",
        examCode: "AZ-305",
        passingScore: 700,
        categories: [
          "Design identity, governance, and monitoring solutions (25-30%)",
          "Design data storage solutions (25-30%)",
          "Design business continuity solutions (10-15%)",
          "Design infrastructure solutions (25-30%)"
        ],
        detailedSyllabus: [
          {
            domain: "Design identity, governance, and monitoring solutions (25-30%)",
            topics: [
              "Design a governance solution including Azure landing zones, management groups, and subscriptions",
              "Design an identity and access management solution using Azure AD",
              "Design a solution for securing identities including Azure AD Identity Protection",
              "Design a solution for access management including Azure RBAC, Azure AD PIM",
              "Design a solution for managing secrets, certificates, and keys using Azure Key Vault",
              "Design a monitoring strategy including Azure Monitor, Log Analytics, and Application Insights",
              "Design for governance including Azure Policy, resource locks, and tags"
            ]
          },
          {
            domain: "Design data storage solutions (25-30%)",
            topics: [
              "Design a solution for databases including Azure SQL Database, Azure Database for MySQL/PostgreSQL",
              "Design data integration solutions including Azure Data Factory, Azure Synapse Analytics",
              "Select an appropriate storage account including replication strategy and access tiers",
              "Design a data solution for relational data, non-relational data, and data analytics",
              "Design a data protection strategy including backup and disaster recovery",
              "Design for Azure Cosmos DB including API selection, consistency levels, and partition strategy"
            ]
          },
          {
            domain: "Design business continuity solutions (10-15%)",
            topics: [
              "Design a solution for backup and disaster recovery including Azure Backup and Azure Site Recovery",
              "Design for high availability using availability sets, availability zones, and Load Balancers",
              "Design a disaster recovery solution for hybrid and multi-cloud environments",
              "Identify resources that require backup and the frequency of backup",
              "Design for business continuity including RTO and RPO requirements"
            ]
          },
          {
            domain: "Design infrastructure solutions (25-30%)",
            topics: [
              "Design a compute solution including virtual machines, containers, and serverless computing",
              "Design an application architecture including microservices, APIs, and event-driven architecture",
              "Design network solutions including virtual networks, load balancing, and connectivity",
              "Design a solution for containers including Azure Container Instances, Azure Kubernetes Service",
              "Design a messaging architecture including Azure Service Bus, Event Grid, and Event Hubs",
              "Design an automation solution including Azure Resource Manager templates and Infrastructure as Code"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    description: "Google Cloud Platform certification and skill development", 
    icon: "/gcp_logo.svg",
    examTypes: []
  }
];