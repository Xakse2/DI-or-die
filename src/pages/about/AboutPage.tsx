import './about.css';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  githubUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Roman',
    role: 'Teamlead',
    bio: 'Planning and organizing team work, distributing tasks, creating a login page',
    photoUrl: 'https://46f32a42-e4ff-489b-8e03-b52e4d70fd18.selcdn.net/i/webp/58/fae81f042b927fa3201fc3bddafb13.webp',
    githubUrl: 'https://github.com/Xakse2',
  },
  {
    name: 'Yuliya',
    role: 'Frontend Developer',
    bio: 'Creating Application Components',
    photoUrl: 'https://46f32a42-e4ff-489b-8e03-b52e4d70fd18.selcdn.net/i/webp/bd/0b535c0940e86a9602bbfbe417fd9f.webp',
    githubUrl: 'https://github.com/YuliyaNaletskaya',
  },
  {
    name: 'Polina',
    role: 'Frontend Developer',
    bio: 'Creating Application Components, creating a registration page',
    photoUrl: 'https://46f32a42-e4ff-489b-8e03-b52e4d70fd18.selcdn.net/i/webp/65/e12421ba7dded447e04529e7fabb8e.webp',
    githubUrl: 'https://github.com/linawashere',
  },
];

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm text-center team-card">
              <img
                src={member.photoUrl}
                alt={`${member.name}'s photo`}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <p className="text-sm mt-2">{member.bio}</p>
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 underline mt-2 inline-block"
              >
                GitHub profile
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">RS School</h2>
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <img
            src="https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg"
            alt="RS School Logo"
            className="w-48 mx-auto"
          />
        </a>
        <p className="text-gray-600 mt-4">
          Find out more about the training program on the website{' '}
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 underline"
          >
            RS School
          </a>
          .
        </p>
      </section>
    </div>
  )
}

export default AboutPage;