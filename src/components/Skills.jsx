function Skills({ SkillList, skillList = [] }) {
  const skills = SkillList ?? skillList;

  return (
    <section className="skills">
      <h2>Skills</h2>
      <div className="skills-list">
        {skills?.map((skill) => (
          <span className="skill-badge" key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  );
}

export default Skills;