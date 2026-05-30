export const profileCode = `const developer = {
  nickName: 'harsh2055',
  fullNameL: 'Harsh Rajesh Singh',
  birthDate: new Date(2005, 1, 1), // Optional, just placeholder
  role: 'Full-Stack Developer | AI & Backend Enthusiast',
  location: 'Nallasopara, Mumbai, India',
  experience: 'Fresher',
  email: 'harshs288375@gmail.com',
  availability: 'Open to opportunities, Remote work preferred',
  hardWorker: true,
  quickLearning: true,
  problemSolver: true,
  preferredLanguages: LANGUAGES.ENGLISH,
  hireable: function() {
    return this.hardWorker&&
    this.problemSolver&&
    this.skills.length>=5 &&
    this.availability === 'Open to opportunities, Remote work preferred';
},
  connect: function() {
    return "Let's build something amazing together!";
  }
};`;

export const profileTitle = 'developer.js';
