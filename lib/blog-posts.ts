export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  author?: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Next Hardware Hack 2024: Building the Future in 48 Hours",
    excerpt: "Recap of our largest hackathon yet - 300+ participants, 50+ projects, and $25,000 in prizes. Winning teams showcased innovative edge AI devices, robotics controllers, and AR hardware prototypes.",
    content: `
      <p>The Next Hardware Hack 2024 was our most ambitious event yet, bringing together 300+ hardware engineers, founders, and makers for an intensive 48-hour innovation sprint. The energy was electric as teams worked through the night, turning ideas into working prototypes.</p>
      
      <h2>Record-Breaking Participation</h2>
      <p>This year's hackathon saw unprecedented participation, with teams from Google, NVIDIA, Apple, Meta, and dozens of startups. The diversity of projects was remarkable—from edge AI controllers to full robotics systems.</p>
      
      <h2>Winning Projects</h2>
      <p>The first-place team developed an autonomous drone controller using TensorFlow Lite on ARM Cortex-M7, achieving real-time object detection with just 50mW power consumption. Second place went to a spatial computing AR glasses prototype with custom optics and SLAM tracking. Third place featured a neuromorphic computing chip design that's 10x more energy efficient than traditional AI processors.</p>
      
      <h2>Impact</h2>
      <p>Beyond the prizes, three teams received funding offers from VCs in attendance, and five projects are now in production. The hackathon demonstrated the incredible innovation happening at the intersection of AI, hardware, and robotics.</p>
    `,
    date: "October 15, 2024",
    category: "Events",
    readTime: "5 min read",
    author: "Next Hardware Team",
  },
  {
    id: 2,
    title: "The Rise of Edge AI: Community Insights from 2024",
    excerpt: "Our community's perspective on the shift toward edge computing. Engineers from Google, NVIDIA, and Apple share their experiences deploying AI models on custom hardware and embedded systems.",
    content: `
      <p>Edge AI has become one of the most transformative trends in hardware engineering. As AI models grow more sophisticated, the need to run them efficiently on-device has never been greater.</p>
      
      <h2>Industry Perspectives</h2>
      <p>Engineers from Google shared insights on deploying TensorFlow Lite for microcontrollers, achieving inference times under 10ms on ARM Cortex-M7. NVIDIA engineers discussed their work on Jetson platforms, enabling real-time computer vision on edge devices.</p>
      
      <h2>Technical Challenges</h2>
      <p>The shift to edge AI presents unique challenges: power consumption, model optimization, and real-time performance. Our community has been at the forefront of solving these problems, sharing techniques for quantization, pruning, and custom hardware acceleration.</p>
      
      <h2>Future Outlook</h2>
      <p>As edge AI continues to evolve, we're seeing increased interest in custom silicon, neuromorphic computing, and hybrid cloud-edge architectures. The community is actively exploring these frontiers.</p>
    `,
    date: "August 22, 2024",
    category: "Technical",
    readTime: "8 min read",
    author: "Dr. Sarah Chen",
  },
  {
    id: 3,
    title: "Member Spotlight: How a Next Hardware Connection Led to a $2M Seed Round",
    excerpt: "Alex Kim, founder of RoboTech Systems, shares how meeting his co-founder at a Next Hardware meetup led to launching a robotics startup that just closed its seed funding round.",
    content: `
      <p>Alex Kim's journey from Next Hardware member to funded startup founder is a testament to the power of community connections.</p>
      
      <h2>The Meeting</h2>
      <p>At a Next Hardware meetup in early 2024, Alex met his future co-founder, who was working on autonomous navigation systems. Their complementary skills—Alex's expertise in embedded systems and his co-founder's background in robotics—created the perfect foundation for a startup.</p>
      
      <h2>Building the Product</h2>
      <p>RoboTech Systems developed an autonomous delivery robot platform, leveraging edge AI for real-time decision making. The platform uses custom PCBs designed through community feedback and partnerships formed at Next Hardware events.</p>
      
      <h2>Funding Success</h2>
      <p>After showcasing their prototype at the Next Hardware Hack 2024, RoboTech Systems caught the attention of several VCs. They closed a $2M seed round in June 2024, with investors citing the technical depth and market validation demonstrated through the community.</p>
      
      <h2>Community Impact</h2>
      <p>Alex continues to be an active member, mentoring new founders and sharing lessons learned. His story inspires others in the community to pursue their hardware startup dreams.</p>
    `,
    date: "June 10, 2024",
    category: "Community",
    readTime: "6 min read",
    author: "Alex Kim",
  },
  {
    id: 4,
    title: "Custom Silicon Workshop: What We Learned",
    excerpt: "Deep dive into our ASIC design workshop with 80+ engineers. Industry experts from Google and NVIDIA taught chip design fundamentals, RTL synthesis, and the tape-out process.",
    content: `
      <p>Our Custom Silicon Workshop brought together 80+ engineers for an intensive deep dive into ASIC design, from concept to tape-out.</p>
      
      <h2>Workshop Structure</h2>
      <p>The two-day workshop covered chip design fundamentals, RTL synthesis, verification methodologies, and the tape-out process. Industry experts from Google and NVIDIA shared real-world case studies and best practices.</p>
      
      <h2>Key Learnings</h2>
      <p>Participants learned about power optimization techniques, clock domain crossing, and design for testability. The hands-on sessions included working with industry-standard EDA tools and simulating custom logic blocks.</p>
      
      <h2>Follow-Up Projects</h2>
      <p>Several participants have since launched custom silicon projects, with three teams currently in the design phase. The workshop created a cohort of engineers equipped to tackle custom chip design.</p>
    `,
    date: "April 5, 2024",
    category: "Learning",
    readTime: "7 min read",
    author: "Michael Zhang",
  },
  {
    id: 5,
    title: "Reaching 1,000 Members: A Community Milestone",
    excerpt: "Reflecting on our growth from 50 members in 2023 to over 1,000 in early 2024. What we've learned about building a hardware community and the projects that have emerged.",
    content: `
      <p>Reaching 1,000 members was a significant milestone for Next Hardware, representing a 20x growth in just over a year.</p>
      
      <h2>The Journey</h2>
      <p>We started in 2023 with 50 members at our first meetup in Silicon Valley. Through word-of-mouth, quality events, and genuine community building, we've grown to over 1,000 members from leading companies and universities.</p>
      
      <h2>What We've Learned</h2>
      <p>Building a hardware community requires technical depth, genuine connections, and a commitment to knowledge sharing. We've focused on creating value through events, workshops, and project showcases rather than just growing numbers.</p>
      
      <h2>Community Impact</h2>
      <p>Our members have launched startups, published research, and collaborated on groundbreaking projects. The community has become a hub for hardware innovation, connecting engineers across companies and universities.</p>
    `,
    date: "February 18, 2024",
    category: "Community",
    readTime: "5 min read",
    author: "Next Hardware Team",
  },
  {
    id: 6,
    title: "Next Hardware Summit 2023: Highlights and Takeaways",
    excerpt: "Our first annual summit brought together 200+ hardware engineers, researchers, and founders. Keynotes on spatial computing, embodied AI, and the future of edge hardware.",
    content: `
      <p>Our first annual Next Hardware Summit was a landmark event, bringing together 200+ hardware engineers, researchers, and founders for a day of keynotes, workshops, and networking.</p>
      
      <h2>Keynote Speakers</h2>
      <p>The summit featured keynotes on spatial computing from industry leaders, embodied AI from robotics experts, and the future of edge hardware from chip designers. Each talk sparked deep technical discussions.</p>
      
      <h2>Workshops</h2>
      <p>Hands-on workshops covered PCB design, embedded systems programming, and AI hardware optimization. Participants left with practical skills and new connections.</p>
      
      <h2>Networking Impact</h2>
      <p>The summit facilitated dozens of new connections, with several collaborations and partnerships formed. The event set the stage for future summits and established Next Hardware as a premier hardware community.</p>
    `,
    date: "December 8, 2023",
    category: "Events",
    readTime: "6 min read",
    author: "Next Hardware Team",
  },
  {
    id: 7,
    title: "Building Hardware Communities: Lessons from Year One",
    excerpt: "What we've learned in our first year about fostering collaboration, sharing knowledge, and connecting hardware engineers across companies and universities.",
    content: `
      <p>After our first year, we've learned valuable lessons about building a hardware community that truly serves its members.</p>
      
      <h2>Technical Depth Matters</h2>
      <p>Hardware engineers value deep technical discussions. We've found that events focusing on specific technical topics—like ASIC design or edge AI—generate the most engagement and value.</p>
      
      <h2>Knowledge Sharing Culture</h2>
      <p>Creating a culture of knowledge sharing requires leading by example. When community leaders share projects, failures, and learnings, others follow suit. This openness has been key to our success.</p>
      
      <h2>Connecting Across Boundaries</h2>
      <p>Some of our most valuable connections have been between academia and industry, or between different companies. Facilitating these cross-boundary connections has created unique value.</p>
    `,
    date: "September 20, 2023",
    category: "Community",
    readTime: "7 min read",
    author: "Next Hardware Team",
  },
  {
    id: 8,
    title: "First Hackathon Success: 120 Engineers, 30 Projects",
    excerpt: "Recap of our inaugural hardware hackathon. Teams built everything from AI-powered sensors to robotics controllers. Three projects received funding offers from VCs in attendance.",
    content: `
      <p>Our first hackathon exceeded all expectations, bringing together 120 engineers to build 30 projects over 48 hours.</p>
      
      <h2>The Projects</h2>
      <p>Teams built everything from AI-powered sensors to full robotics controllers. The diversity and quality of projects demonstrated the incredible talent in our community.</p>
      
      <h2>Winning Teams</h2>
      <p>The winning team created an edge AI sensor fusion system for autonomous vehicles. Second place went to a robotics controller with real-time path planning. Third place featured a custom PCB for IoT applications.</p>
      
      <h2>VC Interest</h2>
      <p>Three projects received funding offers from VCs in attendance, validating the commercial potential of the work. The hackathon proved that great hardware projects can emerge from community collaboration.</p>
    `,
    date: "May 12, 2023",
    category: "Events",
    readTime: "5 min read",
    author: "Next Hardware Team",
  },
];

export function getBlogPost(id: number): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getRelatedPosts(currentPostId: number, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPost(currentPostId);
  if (!currentPost) return [];

  // Get posts with same category, excluding current post
  const related = blogPosts
    .filter((post) => post.id !== currentPostId && post.category === currentPost.category)
    .slice(0, limit);

  // If not enough posts with same category, fill with other posts
  if (related.length < limit) {
    const additional = blogPosts
      .filter((post) => post.id !== currentPostId && !related.some((r) => r.id === post.id))
      .slice(0, limit - related.length);
    return [...related, ...additional];
  }

  return related;
}

