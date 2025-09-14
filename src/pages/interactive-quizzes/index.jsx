import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QuizCard from './components/QuizCard';
import QuizInterface from './components/QuizInterface';
import QuizStats from './components/QuizStats';
import QuizFilters from './components/QuizFilters';

const InteractiveQuizzes = () => {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [quizResults, setQuizResults] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [showCompleted, setShowCompleted] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
      const results = JSON.parse(savedResults);
      setQuizResults(results);
      setCompletedQuizzes(Object.keys(results));
    }
  }, []);

  const quizzes = [
    {
      id: 'fire-basics',
      title: 'Fire Safety Basics',
      category: 'Fire Safety',
      description: 'Learn fundamental fire safety principles, prevention methods, and emergency response procedures for various fire scenarios.',
      difficulty: 'beginner',
      duration: 10,
      questions: 15,
      rating: 4.8,
      attempts: 1247,
      icon: 'Flame',
      color: 'bg-red-500',
      questionsData: [
        {
          question: 'What is the most important thing to do when you discover a fire?',
          options: [
            'Try to put it out yourself',
            'Alert others and evacuate immediately',
            'Take photos for insurance',
            'Gather your belongings first'
          ],
          correctAnswer: 1
        },
        {
          question: 'Which class of fire extinguisher is used for electrical fires?',
          options: ['Class A', 'Class B', 'Class C', 'Class D'],
          correctAnswer: 2
        },
        {
          question: 'How often should smoke detectors be tested?',
          options: ['Once a year', 'Every 6 months', 'Monthly', 'Weekly'],
          correctAnswer: 2
        },
        {
          question: 'What does the acronym PASS stand for in fire extinguisher use?',
          options: [
            'Point, Aim, Squeeze, Sweep',
            'Pull, Aim, Squeeze, Sweep',
            'Push, Aim, Spray, Stop',
            'Pull, Alert, Spray, Sweep'
          ],
          correctAnswer: 1
        },
        {
          question: 'If your clothes catch fire, what should you do?',
          options: [
            'Run to get help',
            'Stop, Drop, and Roll',
            'Jump in water immediately',
            'Remove clothes quickly'
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'earthquake-response',
      title: 'Earthquake Response',
      category: 'Earthquake Preparedness',
      description: 'Master earthquake safety protocols, including drop-cover-hold techniques and post-earthquake assessment procedures.',
      difficulty: 'intermediate',
      duration: 15,
      questions: 20,
      rating: 4.6,
      attempts: 892,
      icon: 'Zap',
      color: 'bg-amber-500',
      questionsData: [
        {
          question: 'During an earthquake, what is the safest action to take indoors?',
          options: [
            'Run outside immediately',
            'Stand in a doorway',
            'Drop, Cover, and Hold On',
            'Hide under a bed'
          ],
          correctAnswer: 2
        },
        {
          question: 'What is the "Triangle of Life" theory?',
          options: [
            'A proven earthquake safety method',
            'A debunked and dangerous theory',
            'The safest place during earthquakes',
            'A rescue technique'
          ],
          correctAnswer: 1
        },
        {
          question: 'How long should you stay in your protective position during shaking?',
          options: [
            'Until the shaking stops',
            '30 seconds maximum',
            'Until help arrives',
            'Until the shaking stops and a few seconds after'
          ],
          correctAnswer: 3
        },
        {
          question: 'What should you avoid during an earthquake?',
          options: [
            'Getting under a sturdy desk',
            'Standing near windows or mirrors',
            'Protecting your head and neck',
            'Staying where you are'
          ],
          correctAnswer: 1
        },
        {
          question: 'After an earthquake, what should be your first priority?',
          options: [
            'Check for injuries and hazards',
            'Call insurance company',
            'Clean up the mess',
            'Post on social media'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      id: 'flood-preparedness',
      title: 'Flood Preparedness',
      category: 'Flood Response',
      description: 'Understand flood risks, evacuation procedures, and water safety measures for flood-prone areas.',
      difficulty: 'intermediate',
      duration: 12,
      questions: 18,
      rating: 4.7,
      attempts: 654,
      icon: 'Waves',
      color: 'bg-blue-500',
      questionsData: [
        {
          question: 'How much water can knock you down?',
          options: ['6 inches', '1 foot', '2 feet', '3 feet'],
          correctAnswer: 0
        },
        {
          question: 'What should you do if your car stalls in flood water?',
          options: [
            'Stay in the car and wait',
            'Try to restart the engine',
            'Abandon the car and move to higher ground',
            'Call for a tow truck'
          ],
          correctAnswer: 2
        },
        {
          question: 'Which items should be in a flood emergency kit?',
          options: [
            'Only food and water',
            'Important documents in waterproof container',
            'Electronics and gadgets',
            'Heavy furniture'
          ],
          correctAnswer: 1
        },
        {
          question: 'What does a Flash Flood Warning mean?',
          options: [
            'Flooding is possible',
            'Flooding is occurring or imminent',
            'Flooding happened yesterday',
            'Flooding might happen next week'
          ],
          correctAnswer: 1
        },
        {
          question: 'How should you evacuate during a flood?',
          options: [
            'Drive through any water',
            'Walk through moving water',
            'Use designated evacuation routes',
            'Wait until the last minute'
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'first-aid-basics',
      title: 'First Aid Essentials',
      category: 'First Aid',
      description: 'Learn critical first aid techniques including CPR, wound care, and emergency medical response procedures.',
      difficulty: 'beginner',
      duration: 20,
      questions: 25,
      rating: 4.9,
      attempts: 1456,
      icon: 'Heart',
      color: 'bg-green-500',
      questionsData: [
        {
          question: 'What is the correct ratio for chest compressions to rescue breaths in CPR?',
          options: ['15:2', '30:2', '5:1', '10:2'],
          correctAnswer: 1
        },
        {
          question: 'How deep should chest compressions be for an adult?',
          options: ['1 inch', '2 inches', '3 inches', '4 inches'],
          correctAnswer: 1
        },
        {
          question: 'What should you do first when someone is bleeding heavily?',
          options: [
            'Apply direct pressure',
            'Elevate the wound',
            'Apply a tourniquet',
            'Clean the wound'
          ],
          correctAnswer: 0
        },
        {
          question: 'What is the recovery position used for?',
          options: [
            'Conscious injured person',
            'Unconscious but breathing person',
            'Person in cardiac arrest',
            'Person with broken bones'
          ],
          correctAnswer: 1
        },
        {
          question: 'How should you treat a burn?',
          options: [
            'Apply ice directly',
            'Use butter or oil',
            'Cool with running water',
            'Pop any blisters'
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'emergency-communication',
      title: 'Emergency Communication',
      category: 'General Preparedness',
      description: 'Master emergency communication protocols, alert systems, and coordination procedures during disasters.',
      difficulty: 'advanced',
      duration: 18,
      questions: 22,
      rating: 4.5,
      attempts: 423,
      icon: 'Radio',
      color: 'bg-purple-500',
      questionsData: [
        {
          question: 'What is the universal emergency number in India?',
          options: ['100', '101', '102', '112'],
          correctAnswer: 3
        },
        {
          question: 'Which communication method works best during power outages?',
          options: ['Landline phones', 'Cell phones', 'Battery-powered radio', 'Internet'],
          correctAnswer: 2
        },
        {
          question: 'What information should you include in an emergency message?',
          options: [
            'Only your location',
            'Location, nature of emergency, number of people',
            'Just your name',
            'Only the type of emergency'
          ],
          correctAnswer: 1
        },
        {
          question: 'How often should you test your emergency communication plan?',
          options: ['Once a year', 'Every 6 months', 'Monthly', 'Weekly'],
          correctAnswer: 1
        },
        {
          question: 'What is the purpose of an emergency contact card?',
          options: [
            'To have phone numbers when systems fail',
            'For insurance purposes',
            'To remember birthdays',
            'For social media contacts'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      id: 'evacuation-procedures',
      title: 'Evacuation Procedures',
      category: 'General Preparedness',
      description: 'Learn proper evacuation techniques, route planning, and assembly point procedures for various emergency scenarios.',
      difficulty: 'intermediate',
      duration: 14,
      questions: 19,
      rating: 4.4,
      attempts: 567,
      icon: 'MapPin',
      color: 'bg-indigo-500',
      questionsData: [
        {
          question: 'What should you do first when an evacuation is announced?',
          options: [
            'Gather all belongings',
            'Follow designated evacuation routes',
            'Call family members',
            'Take photos of property'
          ],
          correctAnswer: 1
        },
        {
          question: 'How should you move during an evacuation?',
          options: [
            'Run as fast as possible',
            'Walk quickly but calmly',
            'Take your time',
            'Push through crowds'
          ],
          correctAnswer: 1
        },
        {
          question: 'What should you bring during an evacuation?',
          options: [
            'Everything valuable',
            'Only essential items and documents',
            'All electronics',
            'Furniture and appliances'
          ],
          correctAnswer: 1
        },
        {
          question: 'Where should you go after evacuating a building?',
          options: [
            'Parking lot',
            'Designated assembly point',
            'Nearest restaurant',
            'Your car'
          ],
          correctAnswer: 1
        },
        {
          question: 'What should you do if you encounter smoke during evacuation?',
          options: [
            'Stand up straight',
            'Stay low and crawl',
            'Hold your breath and run',
            'Use the elevator'
          ],
          correctAnswer: 1
        }
      ]
    }
  ];

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleQuizComplete = (quizId, score) => {
    if (!completedQuizzes?.includes(quizId)) {
      setCompletedQuizzes([...completedQuizzes, quizId]);
    }
  };

  const handleBackToList = () => {
    setSelectedQuiz(null);
  };

  const filterQuizzes = (quizzes) => {
    let filtered = [...quizzes];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(quiz => 
        quiz?.category?.toLowerCase()?.includes(selectedCategory?.toLowerCase())
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered?.filter(quiz => quiz?.difficulty === selectedDifficulty);
    }

    // Filter by completion status
    if (!showCompleted) {
      filtered = filtered?.filter(quiz => !completedQuizzes?.includes(quiz?.id));
    }

    // Sort quizzes
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          return difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty];
        case 'duration':
          return a?.duration - b?.duration;
        case 'rating':
          return b?.rating - a?.rating;
        case 'attempts':
          return b?.attempts - a?.attempts;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredQuizzes = filterQuizzes(quizzes);

  if (selectedQuiz) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QuizInterface
            quiz={selectedQuiz}
            onQuizComplete={handleQuizComplete}
            onBackToList={handleBackToList}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Icon name="Brain" size={48} color="var(--color-primary)" />
            </div>
          </div>
          <h1 className="font-heading font-bold text-4xl text-foreground mb-4">
            Interactive Quizzes
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Test your disaster preparedness knowledge with our comprehensive quiz collection. 
            Track your progress and earn achievements as you master emergency response skills.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="bg-card rounded-lg border border-border p-1 flex">
            <Button
              variant={activeTab === 'quizzes' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('quizzes')}
              iconName="BookOpen"
              iconPosition="left"
              className="rounded-md"
            >
              Available Quizzes
            </Button>
            <Button
              variant={activeTab === 'stats' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('stats')}
              iconName="BarChart3"
              iconPosition="left"
              className="rounded-md"
            >
              Statistics & Progress
            </Button>
          </div>
        </motion.div>

        {activeTab === 'quizzes' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Filters */}
            <QuizFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showCompleted={showCompleted}
              setShowCompleted={setShowCompleted}
            />

            {/* Quiz Grid */}
            {filteredQuizzes?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes?.map((quiz, index) => (
                  <motion.div
                    key={quiz?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <QuizCard
                      quiz={quiz}
                      onStartQuiz={handleStartQuiz}
                      completedQuizzes={completedQuizzes}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">No Quizzes Found</h3>
                <p className="text-muted-foreground mb-4">
                  No quizzes match your current filters. Try adjusting your search criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setShowCompleted(false);
                  }}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <QuizStats
              quizResults={quizResults}
              completedQuizzes={completedQuizzes}
            />
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-card rounded-lg border border-border p-8 text-center"
        >
          <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
            Ready to Learn More?
          </h3>
          <p className="text-muted-foreground mb-6">
            Explore our comprehensive training modules to deepen your disaster preparedness knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => window.location.href = '/training-modules'}
              iconName="BookOpen"
              iconPosition="left"
            >
              View Training Modules
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/live-alerts-dashboard'}
              iconName="AlertTriangle"
              iconPosition="left"
            >
              Check Live Alerts
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveQuizzes;