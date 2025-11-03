/**
 * Topic mappings for different certification exams
 * Used for customization options in quiz setup
 */

export type ExamTopicMapping = Record<string, string[]>;

export const examTopicMappings: Record<string, ExamTopicMapping> = {
  'cloud-practitioner': {
    'Cloud Concepts (24%)': [
      'Cloud Benefits',
      'Design Principles', 
      'Migration Strategies',
      'Cloud Economics'
    ],
    'Security and Compliance (30%)': [
      'Shared Responsibility Model',
      'Security Governance & Compliance',
      'Access Management',
      'Security Resources'
    ],
    'Cloud Technology and Services (34%)': [
      'Deployment and Operations',
      'Global Infrastructure',
      'Compute Services',
      'Database Services',
      'Networking Services',
      'Storage Services',
      'AI/ML and Analytics'
    ],
    'Billing, Pricing, and Support (12%)': [
      'Pricing Models',
      'Billing and Cost Management',
      'Support and Resources'
    ]
  },
  'developer-associate': {
    'Development with AWS Services (32%)': [
      'Application Development',
      'AWS Lambda Development',
      'Data Store Integration'
    ],
    'Security (26%)': [
      'Authentication & Authorization',
      'Encryption',
      'Sensitive Data Handling'
    ],
    'Deployment (24%)': [
      'Application Deployment',
      'Testing and Automation',
      'CI/CD Pipelines'
    ],
    'Troubleshooting and Optimization (18%)': [
      'Root Cause Analysis',
      'Code Instrumentation',
      'Performance Optimization'
    ]
  },
  'solutions-architect-associate': {
    'Design Secure Architectures (30%)': [
      'Secure Access Design',
      'Secure Workloads',
      'Data Security Controls'
    ],
    'Design Resilient Architectures (26%)': [
      'Scalable Architectures',
      'High Availability',
      'Disaster Recovery'
    ],
    'Design High-Performing Architectures (24%)': [
      'Storage Solutions',
      'Compute Solutions',
      'Database Solutions',
      'Network Architectures'
    ],
    'Design Cost-Optimized Architectures (20%)': [
      'Cost-Optimized Storage',
      'Cost-Optimized Compute',
      'Cost Management'
    ]
  },
  'data-engineer-associate': {
    'Data Ingestion and Transformation (34%)': [
      'Data Ingestion Solutions',
      'Data Processing',
      'Pipeline Orchestration'
    ],
    'Data Store Management (26%)': [
      'Data Store Selection',
      'Data Cataloging',
      'Data Lifecycle'
    ],
    'Data Operations and Support (22%)': [
      'Data Automation',
      'Pipeline Monitoring',
      'Performance Optimization'
    ],
    'Data Security and Governance (18%)': [
      'Data Authentication',
      'Data Encryption',
      'Data Auditing'
    ]
  },
  // Azure exams
  'azure-fundamentals': {
    'Cloud Concepts (25-30%)': [
      'Cloud Computing Benefits',
      'Shared Responsibility',
      'Cloud Service Types',
      'Consumption Models'
    ],
    'Azure Architecture and Services (35-40%)': [
      'Azure Regions and Zones',
      'Azure Compute Services',
      'Azure Networking',
      'Azure Storage',
      'Azure Databases',
      'Azure Identity'
    ],
    'Azure Management and Governance (30-35%)': [
      'Cost Management',
      'Governance Tools',
      'Management Tools',
      'Monitoring Tools'
    ]
  },
  'azure-developer-associate': {
    'Develop Azure compute solutions (25-30%)': [
      'Virtual Machines',
      'ARM Templates',
      'Container Solutions',
      'App Service',
      'Azure Functions'
    ],
    'Develop for Azure storage (15-20%)': [
      'Cosmos DB',
      'Blob Storage',
      'Azure Files',
      'Cognitive Search'
    ],
    'Implement Azure security (20-25%)': [
      'User Authentication',
      'Key Vault',
      'Managed Identities',
      'Multi-factor Authentication'
    ],
    'Monitor, troubleshoot, and optimize (15-20%)': [
      'Application Insights',
      'Azure Monitor',
      'Caching Solutions',
      'Autoscaling'
    ],
    'Connect to and consume services (15-20%)': [
      'API Management',
      'Service Bus',
      'Event Grid',
      'Microsoft Graph'
    ]
  },
  'azure-solutions-architect-expert': {
    'Design identity, governance, and monitoring (25-30%)': [
      'Governance Solutions',
      'Identity Management',
      'Monitoring Strategy',
      'Secret Management'
    ],
    'Design data storage solutions (25-30%)': [
      'Database Solutions',
      'Data Integration',
      'Storage Accounts',
      'Data Protection'
    ],
    'Design business continuity solutions (10-15%)': [
      'Backup and Recovery',
      'High Availability',
      'Disaster Recovery'
    ],
    'Design infrastructure solutions (25-30%)': [
      'Compute Solutions',
      'Application Architecture',
      'Network Solutions',
      'Messaging Architecture'
    ]
  }
};

/**
 * Get topic mappings for a specific exam
 * @param examId - The exam identifier
 * @returns Object with categories as keys and topic arrays as values
 */
export const getExamTopics = (examId: string): ExamTopicMapping => {
  return examTopicMappings[examId] || {};
};
