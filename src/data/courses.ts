// Sample course data for the e-learning platform
export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  audioDescription: string;
  duration: string;
  type: "video" | "audio" | "interactive";
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessonsCount: number;
  image: string;
  lessons: Lesson[];
  quizzes: Quiz[];
  tags: string[];
}

export const categories = [
  "All",
  "Reading Skills",
  "Math",
  "Science",
  "Language Arts",
  "Life Skills",
  "Creative Arts",
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Reading Made Easy",
    description: "Learn reading strategies designed for dyslexic learners. This course uses audio-first approaches, visual aids, and multi-sensory techniques to build strong reading foundations. Each lesson breaks down complex words into manageable parts with color-coded syllables and audio support.",
    shortDescription: "Audio-first reading strategies with visual aids",
    category: "Reading Skills",
    difficulty: "beginner",
    duration: "4 weeks",
    lessonsCount: 12,
    image: "📖",
    tags: ["reading", "phonics", "beginner-friendly"],
    lessons: [
      { id: "1-1", title: "Understanding Sounds", content: "Every word is made of small sounds called phonemes. In this lesson, we will listen to sounds and match them with letters. Don't worry about reading—just listen and repeat!", audioDescription: "This lesson teaches basic phoneme awareness through listening exercises.", duration: "15 min", type: "audio" },
      { id: "1-2", title: "Syllable Breaking", content: "Big words can feel scary. But when we break them into small parts called syllables, they become easy! Try clapping along: wa-ter, but-ter-fly, el-e-phant.", audioDescription: "Learn to break words into syllables using clapping and visual color coding.", duration: "20 min", type: "interactive" },
      { id: "1-3", title: "Sight Words Practice", content: "Some words appear so often that recognizing them instantly speeds up your reading. We will practice the 50 most common words using flashcards and audio.", audioDescription: "Practice common sight words with audio flashcards.", duration: "15 min", type: "audio" },
    ],
    quizzes: [
      { id: "q1-1", question: "How many syllables does 'butterfly' have?", options: ["2", "3", "4", "1"], correctAnswer: 1 },
      { id: "q1-2", question: "What is a phoneme?", options: ["A type of phone", "The smallest unit of sound", "A big word", "A sentence"], correctAnswer: 1 },
      { id: "q1-3", question: "Which word has 2 syllables?", options: ["Cat", "Water", "I", "The"], correctAnswer: 1 },
    ],
  },
  {
    id: "2",
    title: "Math Without Numbers",
    description: "Explore mathematical concepts through visual patterns, shapes, and real-world examples. This course removes the barrier of reading-heavy math problems and teaches through audio explanations, diagrams, and hands-on activities.",
    shortDescription: "Visual and audio-based math learning",
    category: "Math",
    difficulty: "beginner",
    duration: "5 weeks",
    lessonsCount: 15,
    image: "🔢",
    tags: ["math", "visual", "patterns"],
    lessons: [
      { id: "2-1", title: "Patterns All Around", content: "Math is about finding patterns. Look around you—stripes on a zebra, tiles on a floor, petals on a flower. In this lesson, we find and create patterns using colors and shapes.", audioDescription: "Discover mathematical patterns in everyday life through visual examples.", duration: "20 min", type: "video" },
      { id: "2-2", title: "Counting with Objects", content: "Forget writing numbers for now. Let's count real things—blocks, coins, fruit. Touch each one as you count. This builds a strong number sense.", audioDescription: "Build number sense by counting physical objects.", duration: "15 min", type: "interactive" },
      { id: "2-3", title: "Shapes and Space", content: "Circles, squares, triangles—they are everywhere! Learn to identify and describe shapes by their features: sides, corners, and curves.", audioDescription: "Learn geometry through identifying shapes in the real world.", duration: "18 min", type: "video" },
    ],
    quizzes: [
      { id: "q2-1", question: "What comes next: ⭐🔵⭐🔵⭐?", options: ["⭐", "🔵", "🔴", "🟢"], correctAnswer: 1 },
      { id: "q2-2", question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correctAnswer: 1 },
    ],
  },
  {
    id: "3",
    title: "Science Through Stories",
    description: "Learn science concepts through narrated stories and visual experiments. Each lesson tells a story about a scientific concept, making it easy to understand and remember. Audio narration is available for every section.",
    shortDescription: "Narrated science stories with visual experiments",
    category: "Science",
    difficulty: "intermediate",
    duration: "6 weeks",
    lessonsCount: 18,
    image: "🔬",
    tags: ["science", "stories", "experiments"],
    lessons: [
      { id: "3-1", title: "The Water Cycle Story", content: "Imagine you are a tiny water drop. You start in the ocean, the sun warms you up, and you rise into the sky as vapor. Up high, it gets cold, and you become a cloud. Then you fall back down as rain. This is the water cycle!", audioDescription: "The water cycle explained as a story of a water droplet's journey.", duration: "25 min", type: "video" },
      { id: "3-2", title: "How Plants Eat Sunlight", content: "Plants are amazing chefs! They take sunlight, water, and air, and cook up their own food. This process is called photosynthesis. The green color in leaves (chlorophyll) is their secret ingredient.", audioDescription: "Photosynthesis explained through a cooking metaphor.", duration: "20 min", type: "audio" },
    ],
    quizzes: [
      { id: "q3-1", question: "What happens to water when the sun heats it?", options: ["It freezes", "It evaporates", "It disappears", "It turns green"], correctAnswer: 1 },
    ],
  },
  {
    id: "4",
    title: "Creative Writing with Audio",
    description: "Express yourself through storytelling! This course uses voice recording and audio prompts to help you create stories without the pressure of writing everything down. Speak your ideas first, then organize them.",
    shortDescription: "Voice-first creative storytelling",
    category: "Language Arts",
    difficulty: "beginner",
    duration: "3 weeks",
    lessonsCount: 9,
    image: "✍️",
    tags: ["writing", "creativity", "audio"],
    lessons: [
      { id: "4-1", title: "Tell Me a Story", content: "Everyone has stories inside them! Close your eyes, imagine a place, a character, and something exciting that happens. Now tell it out loud. That's it—you just created a story!", audioDescription: "Introduction to verbal storytelling and imagination exercises.", duration: "15 min", type: "audio" },
      { id: "4-2", title: "Building Characters", content: "A great story needs interesting characters. Think about: What does your character look like? What do they love? What scares them? The more you know your character, the better your story.", audioDescription: "Create memorable characters using guided audio prompts.", duration: "20 min", type: "interactive" },
    ],
    quizzes: [
      { id: "q4-1", question: "What makes a character interesting?", options: ["Being perfect", "Having details and personality", "Being boring", "Having no name"], correctAnswer: 1 },
    ],
  },
  {
    id: "5",
    title: "Life Skills: Time & Money",
    description: "Practical lessons on telling time, managing money, and daily planning. Uses visual clocks, real-world shopping scenarios, and audio guides to make these essential skills accessible.",
    shortDescription: "Practical time and money management",
    category: "Life Skills",
    difficulty: "beginner",
    duration: "4 weeks",
    lessonsCount: 12,
    image: "⏰",
    tags: ["life-skills", "practical", "money"],
    lessons: [
      { id: "5-1", title: "Reading a Clock", content: "The short hand shows the hour, and the long hand shows the minutes. When the long hand points to 12, it's exactly that hour. Let's practice with some fun examples!", audioDescription: "Learn to read analog clocks with step-by-step audio guidance.", duration: "20 min", type: "interactive" },
    ],
    quizzes: [
      { id: "q5-1", question: "What does the short hand on a clock show?", options: ["Minutes", "Hours", "Seconds", "Days"], correctAnswer: 1 },
    ],
  },
  {
    id: "6",
    title: "Art & Music Exploration",
    description: "Express yourself through colors, shapes, and sounds. This course encourages creativity without any reading requirement. Follow along with audio and video instructions to create art and explore music.",
    shortDescription: "Create art and music with audio guidance",
    category: "Creative Arts",
    difficulty: "beginner",
    duration: "4 weeks",
    lessonsCount: 10,
    image: "🎨",
    tags: ["art", "music", "creative"],
    lessons: [
      { id: "6-1", title: "Colors and Emotions", content: "Colors can show how we feel! Red might mean excited or angry. Blue might mean calm or sad. In this lesson, paint what you feel using any colors you want.", audioDescription: "Explore the connection between colors and emotions through painting.", duration: "25 min", type: "interactive" },
    ],
    quizzes: [
      { id: "q6-1", question: "Which color often represents calm feelings?", options: ["Red", "Blue", "Yellow", "Orange"], correctAnswer: 1 },
    ],
  },
];

// Get recommended courses based on completed course categories
export function getRecommendations(completedCourseIds: string[]): Course[] {
  const completed = courses.filter(c => completedCourseIds.includes(c.id));
  const completedCategories = [...new Set(completed.map(c => c.category))];
  
  // Recommend courses in same categories that aren't completed, then others
  const sameCat = courses.filter(c => !completedCourseIds.includes(c.id) && completedCategories.includes(c.category));
  const otherCat = courses.filter(c => !completedCourseIds.includes(c.id) && !completedCategories.includes(c.category));
  
  return [...sameCat, ...otherCat].slice(0, 3);
}
