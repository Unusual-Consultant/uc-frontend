import MentorDetailClient from "./MentorDetailClient"

export default async function MentorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // Mock mentor data - in real app would fetch based on id
  const mentor = {
    id: id,
    name: "Michael Chen",
    title: "Engineering Manager",
    company: "Meta",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviews: 110,
    location: "Seattle, WA",
    yearsExperience: 10,
    responseTime: "<4 hrs",
    totalMentees: 32,
    successRate: 95,
    hourlyRate: 1500,
    bio: "Experienced engineering manager with 10+ years in tech. Passionate about building high-performing teams and scalable systems. Former Meta and Netflix engineer with expertise in system design, team leadership, and career development.",
    specialties: ["Engineering Management", "System Design", "Node.js"],
    experience: [
      {
        company: "Meta",
        role: "Engineering Manager",
        duration: "2021 - Present",
        description: "Managing a team of 15 engineers across 3 product areas. Improved team velocity by 30% and reduced deployment time by 50%.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
      },
      {
        company: "Netflix",
        role: "Senior Software Engineer",
        duration: "2019 - 2021",
        description: "Led backend architecture for recommendation systems serving 200M+ users. Built scalable microservices handling 1M+ requests per second.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Netflix_2015_logo.svg"
      },
      {
        company: "Google",
        role: "Software Engineer",
        duration: "2017 - 2019",
        description: "Developed distributed systems for Google Cloud Platform. Contributed to open-source projects and mentored junior engineers.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
      }
    ],
    achievements: [
      {
        title: "Tech Leadership Award",
        year: "2023",
        description: "Recognized for outstanding leadership in engineering team management and innovation."
      },
      {
        title: "Mentor of the Year",
        year: "2022",
        description: "Awarded for exceptional mentorship and career development support to junior engineers."
      },
      {
        title: "System Design Expert",
        year: "2021",
        description: "Certified expert in large-scale system design and architecture patterns."
      }
    ]
  }

  // Mock testimonials data
  const testimonials = [
    {
      id: "1",
      menteeName: "Sarah Johnson",
      menteeImage: "/placeholder.svg?height=40&width=40",
      rating: 5,
      review: "Michael's guidance was invaluable for my career transition. His practical advice and real-world examples made complex concepts clear.",
      session: "Career Strategy Call",
      date: "2 days ago"
    },
    {
      id: "2",
      menteeName: "David Chen",
      menteeImage: "/placeholder.svg?height=40&width=40",
      rating: 5,
      review: "Excellent mentor! Helped me understand system design patterns and prepare for senior engineering interviews.",
      session: "System Design Review",
      date: "1 week ago"
    },
    {
      id: "3",
      menteeName: "Emily Rodriguez",
      menteeImage: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      review: "Great session on leadership skills. Michael provided actionable insights for managing technical teams effectively.",
      session: "Leadership Coaching",
      date: "2 weeks ago"
    }
  ]

  // Mock review summary data
  const reviewSummaryData = {
    averageRating: 4.8,
    totalReviews: 110,
    ratingDistribution: {
      5: 86,
      4: 21,
      3: 3,
      2: 0,
      1: 0
    },
    qualityBreakdown: [
      { label: "Punctuality", rating: 4.7 },
      { label: "Communication", rating: 5.0 },
      { label: "Expertise", rating: 4.8 },
      { label: "Helpfulness", rating: 4.9 }
    ],
    strengths: [
      { tag: "Clear Explanations", count: 45 },
      { tag: "Industry Expertise", count: 38 },
      { tag: "Practical Advice", count: 35 },
      { tag: "Great Communication", count: 32 },
      { tag: "Well prepared", count: 28 },
      { tag: "Problem Solver", count: 24 }
    ]
  }

  return (
    <MentorDetailClient 
      mentor={mentor} 
      testimonials={testimonials} 
      reviewSummaryData={reviewSummaryData} 
    />
  )
}
