import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/team/"
        );

        setMembers(response.data.results);
      } catch (error) {
        console.error(error);
        setError("Failed to load team members.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const getInitials = (member) => {
    return `${member.first_name?.[0] || ""}${member.last_name?.[0] || ""}`;
  };

  const getMemberColor = (index) => {
    const colors = [
      "#5b9dff",
      "#ff7a9e",
      "#4fd6a3",
      "#b78cff",
    ];

    return colors[index % colors.length];
  };

  const goToMember = (index) => {
    if (!members.length) {
      return;
    }

    const newIndex = Math.max(
      0,
      Math.min(members.length - 1, index)
    );

    setCurrentIndex(newIndex);

    const element = document.getElementById(
      `member-${members[newIndex].id}`
    );

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        goToMember(currentIndex + 1);
      }

      if (event.key === "ArrowLeft") {
        goToMember(currentIndex - 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, members]);

  if (loading) {
    return (
      <div className="loading-screen">
        Loading team...
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        {error}
      </div>
    );
  }

  return (
    <>
      {/* =========================
          COVER
      ========================= */}

      <section className="cover">
        <div className="kicker">
          Our people · Our strength
        </div>

        <h1>Meet the team</h1>

        <p className="sub">
          The people behind the product — what they build,
          what they love, and the challenges they have conquered.
        </p>

        <div className="strip">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="avatar"
              style={{
                background: getMemberColor(index),
              }}
              onClick={() => goToMember(index)}
              title={`${member.first_name} ${member.last_name}`}
            >
              {getInitials(member)}
            </div>
          ))}
        </div>

        <div className="hint">
          Scroll to explore{" "}
          <span className="arrow">↓</span>
          &nbsp;·&nbsp; use ← → keys to jump between profiles
        </div>
      </section>

      {/* =========================
          TEAM GRID
      ========================= */}

      <main className="team-grid">
        {members.map((member, index) => {
          const color = getMemberColor(index);

          return (
            <article
              key={member.id}
              id={`member-${member.id}`}
              className="team-card"
              style={{
                "--accent": color,
              }}
            >
              {/* CARD TOP */}

              <div className="card-top">
                <div
                  className="big-avatar"
                  style={{
                    background: `linear-gradient(
                      145deg,
                      ${color},
                      ${color}99
                    )`,
                  }}
                >
                  {member.profile_url ? (
                    <img
                      src={member.profile_url}
                      alt={`${member.first_name} ${member.last_name}`}
                    />
                  ) : (
                    getInitials(member)
                  )}
                </div>

                <div className="member-info">
                  <h2>
                    {member.first_name} {member.last_name}
                  </h2>

                  <div className="role">
                    {member.designation}
                  </div>
                </div>
              </div>

              {/* META */}

              <div className="meta">
                <span>
                  Joined {member.joining_date}
                </span>

                <span>
                  {member.office_location}
                </span>

                <span>
                  {member.years} with us
                </span>
              </div>

              {/* CONTENT */}

              <div className="card-content">

                {/* AREA OF WORK */}

                <div className="sect">
                  <h3>What I work on</h3>

                  <div
                    className="rich-content"
                    dangerouslySetInnerHTML={{
                      __html: member.area_of_work || "",
                    }}
                  />
                </div>

                {/* STRENGTH */}

                <div className="sect">
                  <h3>Strengths</h3>

                  <div
                    className="rich-content"
                    dangerouslySetInnerHTML={{
                      __html: member.strength || "",
                    }}
                  />
                </div>

                {/* SKILLS */}

                <div className="sect">
                  <h3>Skills</h3>

                  <div className="tags">
                    {member.skills?.map((skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* HIDDEN TALENTS */}

                <div className="sect">
                  <h3>Hidden talents</h3>

                  <div className="tags">
                    {member.talents?.map((talent) => (
                      <span key={talent}>
                        {talent}
                      </span>
                    ))}
                  </div>
                </div>

                {/* OUTSIDE WORK */}

                <div className="sect full-width">
                  <h3>Outside work</h3>

                  <div className="tags">
                    {member.outside_work?.map((item) => (
                      <span key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CHALLENGE */}

                <div className="story full-width">
                  <h3>A challenge I overcame</h3>

                  <p>
                    {member.overcomed_challenge}
                  </p>
                </div>

              </div>
            </article>
          );
        })}
      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <footer>
        Tip: press Ctrl/Cmd + P to print — each profile gets its own page.
      </footer>

      {/* =========================
          NAVIGATION
      ========================= */}

      <div className="nav">
        <button
          onClick={() => goToMember(currentIndex - 1)}
          aria-label="Previous"
        >
          ←
        </button>

        <button
          onClick={() => goToMember(currentIndex + 1)}
          aria-label="Next"
        >
          →
        </button>
      </div>
    </>
  );
}

export default App;