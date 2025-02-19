export type Prospect = {
    id: string
    email: string
    status: "Lead" | "Customer" | "Qualified Lead" | "Negotiation" | "Lost" | "Others"
    timestamp: string
    initial: string
  }
  
  const STATUS_OPTIONS = ["Lead", "Customer", "Qualified Lead", "Negotiation", "Lost", "Others"] as const
  const NAMES = ["John", "Jane", "Mike", "Sarah", "David", "Lisa", "Tom", "Emma", "Alex", "Mary"]
  
  export const generateProspects = (count: number): Prospect[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `prospect-${i + 1}`,
      email: `${NAMES[i % NAMES.length]}`,
      status: STATUS_OPTIONS[i % STATUS_OPTIONS.length],
      timestamp: "Today at 1:46 PM",
      initial: NAMES[i % NAMES.length][0],
    }))
  }
  
  export const SAMPLE_PROSPECTS = generateProspects(50)
  
  export const getProspectsByPage = (page: number, perPage = 12) => {
    const start = (page - 1) * perPage
    const end = start + perPage
    const prospects = SAMPLE_PROSPECTS.slice(start, end)
    const totalPages = Math.ceil(SAMPLE_PROSPECTS.length / perPage)
  
    return {
      prospects,
      totalPages,
      hasMore: page < totalPages,
    }
  }
  
  