// AWS exam topics organized with their respective exam types and categories


export const examTopics = [
  {
    "id": "aws",
    "name": "AWS (Amazon Web Services)",
    "description": "Comprehensive AWS cloud computing certification and skill development",
    "icon": "☁️",
    "examTypes": [
      {
        "id": "cloud-practitioner",
        "name": "AWS Cloud Practitioner",
        "level": "Foundational",
        "description": "Foundational understanding of AWS Cloud concepts, services, and terminology",
        "duration": "90 minutes",
        "questionCount": "65 questions (50 scored, 15 unscored)",
        "examCode": "CLF-C02",
        "passingScore": 700,
        "categories": [
          "Cloud Concepts (24%)",
          "Security and Compliance (30%)",
          "Cloud Technology and Services (34%)",
          "Billing, Pricing, and Support (12%)"
        ],
        "detailedSyllabus": [
          {
            "domain": "Cloud Concepts (24%)",
            "topics": [
              "Define the benefits of the AWS Cloud",
              "Identify design principles of the AWS Cloud",
              "Understand the benefits of and strategies for migration to the AWS Cloud",
              "Understand concepts of cloud economics"
            ]
          },
          {
            "domain": "Security and Compliance (30%)",
            "topics": [
              "Understand the AWS shared responsibility model",
              "Understand AWS Cloud security, governance, and compliance concepts",
              "Identify AWS access management capabilities",
              "Identify components and resources for security"
            ]
          },
          {
            "domain": "Cloud Technology and Services (34%)",
            "topics": [
              "Define methods of deploying and operating in the AWS Cloud",
              "Define the AWS global infrastructure",
              "Identify AWS compute services",
              "Identify AWS database services",
              "Identify AWS network services",
              "Identify AWS storage services",
              "Identify AWS artificial intelligence and machine learning (AI/ML) services and analytics services",
              "Identify services from other in-scope AWS service categories"
            ]
          },
          {
            "domain": "Billing, Pricing, and Support (12%)",
            "topics": [
              "Compare AWS pricing models",
              "Understand resources for billing, budget, and cost management",
              "Identify AWS technical resources and AWS Support options"
            ]
          }
        ]
      },
      {
        "id": "developer-associate",
        "name": "AWS Developer Associate",
        "level": "Associate",
        "description": "Demonstrates expertise in developing, deploying, and debugging cloud-based applications using AWS",
        "duration": "130 minutes",
        "questionCount": "65 questions (50 scored, 15 unscored)",
        "examCode": "DVA-C02",
        "passingScore": 720,
        "categories": [
          "Development with AWS Services (32%)",
          "Security (26%)",
          "Deployment (24%)",
          "Troubleshooting and Optimization (18%)"
        ],
        "detailedSyllabus": [
          {
            "domain": "Development with AWS Services (32%)",
            "topics": [
              "Develop code for applications hosted on AWS",
              "Develop code for AWS Lambda",
              "Use data stores in application development"
            ]
          },
          {
            "domain": "Security (26%)",
            "topics": [
              "Implement authentication and/or authorization for applications and AWS services",
              "Implement encryption by using AWS services",
              "Manage sensitive data in application code"
            ]
          },
          {
            "domain": "Deployment (24%)",
            "topics": [
              "Prepare application artifacts to be deployed to AWS",
              "Test applications in development environments",
              "Automate deployment testing",
              "Deploy code by using AWS CI/CD services"
            ]
          },
          {
            "domain": "Troubleshooting and Optimization (18%)",
            "topics": [
              "Assist in a root cause analysis",
              "Instrument code for observability",
              "Optimize applications by using AWS services and features"
            ]
          }
        ]
      },
      {
        "id": "sysops-administrator-associate",
        "name": "AWS Certified SysOps Administrator - Associate",
        "level": "Associate",
        "description": "Validates a candidate's ability to deploy, manage, and operate workloads on AWS.",
        "duration": "130 minutes",
        "questionCount": "65 questions (50 scored, 15 unscored)",
        "examCode": "SOA-C02",
        "passingScore": 720,
        "categories": [
          "Monitoring, Logging, and Remediation (20%)",
          "Reliability and Business Continuity (16%)",
          "Deployment, Provisioning, and Automation (18%)",
          "Security and Compliance (16%)",
          "Networking and Content Delivery (18%)",
          "Cost and Performance Optimization (12%)"
        ],
        "detailedSyllabus": [
          {
            "domain": "Monitoring, Logging, and Remediation (20%)",
            "topics": [
              "Implement metrics, alarms, and filters by using AWS monitoring and logging services",
              "Remediate issues based on monitoring and availability metrics"
            ]
          },
          {
            "domain": "Reliability and Business Continuity (16%)",
            "topics": [
              "Implement scalability and elasticity",
              "Implement high availability and resilient environments",
              "Implement backup and restore strategies"
            ]
          },
          {
            "domain": "Deployment, Provisioning, and Automation (18%)",
            "topics": [
              "Provision and maintain cloud resources",
              "Automate manual or repeatable processes"
            ]
          },
          {
            "domain": "Security and Compliance (16%)",
            "topics": [
              "Implement and manage security and compliance policies",
              "Implement data and infrastructure protection strategies"
            ]
          },
          {
            "domain": "Networking and Content Delivery (18%)",
            "topics": [
              "Implement networking features and connectivity",
              "Configure domains, DNS services, and content delivery",
              "Troubleshoot network connectivity issues"
            ]
          },
          {
            "domain": "Cost and Performance Optimization (12%)",
            "topics": [
              "Implement cost optimization strategies",
              "Implement performance optimization strategies"
            ]
          }
        ]
      },
      {
        "id": "solutions-architect-associate",
        "name": "AWS Certified Solutions Architect - Associate",
        "level": "Associate",
        "description": "Validates a candidate's ability to design solutions based on the AWS Well-Architected Framework.",
        "questionCount": "65 questions (50 scored, 15 unscored)",
        "examCode": "SAA-C03",
        "passingScore": 720,
        "categories": [
          "Design Secure Architectures (30%)",
          "Design Resilient Architectures (26%)",
          "Design High-Performing Architectures (24%)",
          "Design Cost-Optimized Architectures (20%)"
        ],
        "detailedSyllabus": [
          {
            "domain": "Design Secure Architectures (30%)",
            "topics": [
              "Design secure access to AWS resources",
              "Design secure workloads and applications",
              "Determine appropriate data security controls"
            ]
          },
          {
            "domain": "Design Resilient Architectures (26%)",
            "topics": [
              "Design scalable and loosely coupled architectures",
              "Design highly available and/or fault-tolerant architectures"
            ]
          },
          {
            "domain": "Design High-Performing Architectures (24%)",
            "topics": [
              "Determine high-performing and/or scalable storage solutions",
              "Design high-performing and elastic compute solutions",
              "Determine high-performing database solutions",
              "Determine high-performing and/or scalable network architectures",
              "Determine high-performing data ingestion and transformation solutions"
            ]
          },
          {
            "domain": "Design Cost-Optimized Architectures (20%)",
            "topics": [
              "Design cost-optimized storage solutions",
              "Design cost-optimized compute solutions",
              "Design cost-optimized database solutions",
              "Design cost-optimized network architectures"
            ]
          }
        ]
      },
      {
        "id": "data-engineer-associate",
        "name": "AWS Certified Data Engineer - Associate",
        "level": "Associate",
        "description": "Validates a candidate's ability to implement data pipelines and to monitor, troubleshoot, and optimize cost and performance issues.",
        "questionCount": "65 questions (50 scored, 15 unscored)",
        "examCode": "DEA-C01",
        "passingScore": 720,
        "categories": [
          "Data Ingestion and Transformation (34%)",
          "Data Store Management (26%)",
          "Data Operations and Support (22%)",
          "Data Security and Governance (18%)"
        ],
        "detailedSyllabus": [
          {
            "domain": "Data Ingestion and Transformation (34%)",
            "topics": [
              "Perform data ingestion",
              "Transform and process data",
              "Orchestrate data pipelines",
              "Apply programming concepts"
            ]
          },
          {
            "domain": "Data Store Management (26%)",
            "topics": [
              "Choose a data store",
              "Understand data cataloging systems",
              "Manage the lifecycle of data",
              "Design data models and schema evolution"
            ]
          },
          {
            "domain": "Data Operations and Support (22%)",
            "topics": [
              "Automate data processing by using AWS services",
              "Analyze data by using AWS services",
              "Maintain and monitor data pipelines",
              "Ensure data quality"
            ]
          },
          {
            "domain": "Data Security and Governance (18%)",
            "topics": [
              "Apply authentication mechanisms",
              "Apply authorization mechanisms",
              "Ensure data encryption and masking",
              "Prepare logs for audit",
              "Understand data privacy and governance"
            ]
          }
        ]
      }
    ]
  }
]