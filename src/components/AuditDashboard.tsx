import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';

interface Audit {
  id: string;
  name: string;
  date: string;
  status: 'past' | 'present' | 'future';
  completion: number;
  image: string;
  location: string;
}

const mockAudits: Audit[] = [
  {
    id: '1',
    name: 'The Ritz-Carlton',
    date: '2024-01-15',
    status: 'past',
    completion: 100,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop',
    location: 'Beverly Hills'
  },
  {
    id: '2',
    name: 'Omni Bedford Springs',
    date: '2025-03-18',
    status: 'present',
    completion: 0,
    image: 'https://lh3.googleusercontent.com/p/AF1QipNwMcCOS4AX0gN0Xm41v5611HCEHlbWT5nU0P_W=s1360-w1360-h1020',
    location: 'Bedford, PA'
  },
  {
    id: '3',
    name: 'Waldorf Astoria',
    date: '2025-07-15',
    status: 'future',
    completion: 0,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2940&auto=format&fit=crop',
    location: 'New York'
  },
  {
    id: '4',
    name: 'Mandarin Oriental',
    date: '2023-12-10',
    status: 'past',
    completion: 100,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2948&auto=format&fit=crop',
    location: 'Tokyo'
  },
  {
    id: '5',
    name: 'Peninsula Hotel',
    date: '2023-11-05',
    status: 'past',
    completion: 100,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940&auto=format&fit=crop',
    location: 'Hong Kong'
  },
  {
    id: '6',
    name: 'Burj Al Arab',
    date: '2023-10-20',
    status: 'past',
    completion: 100,
    image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2940&auto=format&fit=crop',
    location: 'Dubai'
  }
];

export const AuditDashboard = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'past':
        return 'text-green-600';
      case 'present':
        return 'text-blue-600';
      case 'future':
        return 'text-orange-600';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const endDate = new Date(date);
    endDate.setDate(date.getDate() + 2); // Add 2 days for checkout

    if (date.getMonth() === endDate.getMonth()) {
      return `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getDate()}-${endDate.getDate()}, ${date.getFullYear()}`;
    } else {
      return `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${date.getFullYear()}`;
    }
  };

  const getTimeUntil = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const weeks = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 7));
    return `In ${weeks} week${weeks > 1 ? 's' : ''}`;
  };

  return (
    <div className="py-8 space-y-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Your Audits</h1>
      </div>

      {/* Current & Upcoming Audits */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Current & Upcoming Audits</h2>
        <div className="space-y-6">
          {mockAudits
            .filter(audit => audit.status !== 'past')
            .map((audit) => (
              <Card 
                key={audit.id} 
                className={`overflow-hidden ${
                  audit.status === 'future' 
                    ? 'opacity-60' 
                    : 'hover:shadow-lg transition-shadow cursor-pointer'
                }`}
                onClick={() => audit.status !== 'future' && navigate(audit.status === 'present' ? '/audit' : '/report')}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="relative w-full md:w-1/3 h-60 md:h-auto">
                    <img 
                      src={audit.image} 
                      alt={audit.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/75 text-white text-sm px-3 py-1 rounded-full">
                      {getTimeUntil(audit.date)}
                    </div>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        <span className={audit.status !== 'future' ? 'hover:underline' : ''}>{audit.name}</span>
                      </h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{formatDate(audit.date)}</p>
                        <p>{audit.location}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${getStatusColor(audit.status)}`}>
                            {audit.status === 'present' ? 'In Progress' : 'Upcoming'}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            • {audit.completion}%
                          </span>
                        </div>
                        {audit.status === 'present' && (
                          <svg
                            className="h-5 w-5 text-muted-foreground"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Past Audits */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Past Audits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAudits
            .filter(audit => audit.status === 'past')
            .map((audit) => (
              <Card 
                key={audit.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/report/${audit.id}`)}
              >
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={audit.image} 
                    alt={audit.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{audit.name}</h3>
                  <p className="text-sm text-muted-foreground">{audit.location}</p>
                  <p className="text-sm text-muted-foreground mt-1">{formatDate(audit.date)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-sm font-medium ${getStatusColor(audit.status)}`}>
                      Completed
                    </span>
                    <span className="text-sm text-muted-foreground">
                      • {audit.completion}%
                    </span>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};
