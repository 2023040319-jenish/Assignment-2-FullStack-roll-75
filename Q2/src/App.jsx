import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const navItems = [
  {
    path: "/q1",
    label: "Function component",
    number: "01",
    description: "A simple profile card",
  },
  {
    path: "/q2",
    label: "Rendering patterns",
    number: "02",
    description: "Conditional, lists & nesting",
  },
  {
    path: "/q3",
    label: "Counter",
    number: "03",
    description: "Increment, decrement, reset",
  },
  {
    path: "/q4",
    label: "State + ref",
    number: "04",
    description: "Focus and render tracking",
  },
  {
    path: "/q5",
    label: "Digital clock",
    number: "05",
    description: "State with an effect",
  },
  {
    path: "/q6",
    label: "Manual validation",
    number: "06",
    description: "Live form feedback",
  },
  {
    path: "/q7",
    label: "Library validation",
    number: "07",
    description: "React Hook Form + Yup",
  },
  {
    path: "/q8",
    label: "Employees",
    number: "08",
    description: "Fetch JSON into a table",
  },
  {
    path: "/q9",
    label: "Students",
    number: "09",
    description: "Search and filter records",
  },
];

function Shell({ children }) {
  const location = useLocation();
  const active = navItems.find((item) => location.pathname === item.path);
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">R</span>
          <span>
            React lab<small>Assignment 02</small>
          </span>
        </Link>
        <p className="eyebrow">Exercises</p>
        <nav className="exercise-nav" aria-label="Assignment questions">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span className="nav-number">{item.number}</span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span className="status-dot" /> Vite workspace <span>•</span> React 19
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <span className="crumb">
            Q2 / <strong>{active?.label || "Overview"}</strong>
          </span>
          <span className="badge text-bg-light">COMPONENT SHOWCASE</span>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

function PageIntro({ kicker, title, description }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
function DemoCard({ title, tag, children }) {
  return (
    <section className="demo-card">
      <div className="card-heading">
        <h2>{title}</h2>
        {tag && <span className="tag">{tag}</span>}
      </div>
      {children}
    </section>
  );
}
function Home() {
  return (
    <>
      <PageIntro
        kicker="Frontend fundamentals"
        title="React, made visible."
        description="A focused set of small components covering the core patterns in this assignment. Choose an exercise to explore the implementation."
      />
      <div className="overview-grid">
        {navItems.map((item) => (
          <Link to={item.path} className="overview-item" key={item.path}>
            <span className="overview-number">{item.number}</span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
            <span className="arrow">↗</span>
          </Link>
        ))}
      </div>
    </>
  );
}
function Profile() {
  return (
    <>
      <PageIntro
        kicker="Question 01"
        title="Function component"
        description="A reusable profile card built with a plain function component."
      />
      <DemoCard title="Meet Aanya" tag="<ProfileCard />">
        <div className="profile">
          <div className="avatar">AS</div>
          <div>
            <h3>Aanya Shah</h3>
            <p>Frontend developer • Mumbai</p>
            <span className="pill">Available for projects</span>
          </div>
        </div>
      </DemoCard>
    </>
  );
}
function Patterns() {
  const [online, setOnline] = useState(true);
  const topics = ["Components", "Props", "State", "Effects"];
  return (
    <>
      <PageIntro
        kicker="Question 02"
        title="Rendering patterns"
        description="One small case study showing conditions, lists, nested components, and containment through children."
      />
      <div className="two-col">
        <DemoCard title="Team status" tag="conditional">
          <button
            className="btn btn-sm btn-outline-dark mb-3"
            onClick={() => setOnline(!online)}
          >
            Toggle status
          </button>
          <p className={online ? "online" : "offline"}>
            {online ? "● The team is online" : "○ The team is away"}
          </p>
          <ul className="clean-list">
            {topics.map((topic, index) => (
              <li key={topic}>
                <span>0{index + 1}</span>
                {topic}
              </li>
            ))}
          </ul>
        </DemoCard>
        <DemoCard title="Nested panel" tag="children">
          <Panel title="Parent component">
            <p>
              This content is passed through <code>children</code>, making the
              panel reusable.
            </p>
            <div className="mini-panel">Nested child component</div>
          </Panel>
        </DemoCard>
      </div>
    </>
  );
}
function Panel({ title, children }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <PageIntro
        kicker="Question 03"
        title="Counter component"
        description="A stateful counter with the three essential controls."
      />
      <DemoCard title="Session count" tag="useState">
        <div className="counter-display">
          {count}
          <small>actions taken</small>
        </div>
        <div className="button-row">
          <button className="btn btn-dark" onClick={() => setCount(count + 1)}>
            + Increment
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => setCount(count - 1)}
          >
            − Decrement
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>
      </DemoCard>
    </>
  );
}
function StateAndRef() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  return (
    <>
      <PageIntro
        kicker="Question 04"
        title="State + ref"
        description="useState updates the preview while useRef keeps a DOM reference for imperative focus."
      />
      <DemoCard title="Live identity card" tag="useState + useRef">
        <div className="field">
          <label htmlFor="display-name">Your name</label>
          <input
            id="display-name"
            ref={inputRef}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Type something..."
          />
        </div>
        <div className="ref-result">
          <span>Preview</span>
          <strong>{name || "Your name will appear here"}</strong>
          <small>Input focus is controlled with useRef</small>
        </div>
        <button
          className="btn btn-dark"
          onClick={() => inputRef.current.focus()}
        >
          Focus input
        </button>
      </DemoCard>
    </>
  );
}
function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <PageIntro
        kicker="Question 05"
        title="Digital clock"
        description="A real-time clock updated every second with useState and useEffect."
      />
      <DemoCard title="Local time" tag="useEffect">
        <div className="clock">
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
        <p className="muted">Your browser's local timezone • Live now</p>
      </DemoCard>
    </>
  );
}
const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Enter a valid email";
  if (values.message.trim().length < 10)
    errors.message = "Use at least 10 characters";
  return errors;
};
function ManualForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const errors = validate(values);
  const update = (event) =>
    setValues({ ...values, [event.target.name]: event.target.value });
  return (
    <>
      <PageIntro
        kicker="Question 06"
        title="Manual validation"
        description="Validation runs as the user types, with no external form library."
      />
      <DemoCard title="Send a message" tag="custom rules">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          noValidate
        >
          {[
            ["name", "Name", "Your full name"],
            ["email", "Email", "you@example.com"],
            ["message", "Message", "Tell us what you are building"],
          ].map(([key, label, placeholder]) => (
            <div className="field" key={key}>
              <label htmlFor={key}>{label}</label>
              {key === "message" ? (
                <textarea
                  id={key}
                  name={key}
                  value={values[key]}
                  onChange={update}
                  placeholder={placeholder}
                  rows="3"
                />
              ) : (
                <input
                  id={key}
                  name={key}
                  value={values[key]}
                  onChange={update}
                  placeholder={placeholder}
                />
              )}
              {values[key] && errors[key] && (
                <small className="error">{errors[key]}</small>
              )}
            </div>
          ))}
          <button
            className="btn btn-dark"
            disabled={Object.keys(errors).length > 0}
          >
            Submit form
          </button>
          {submitted && Object.keys(errors).length === 0 && (
            <p className="success">Message validated and submitted.</p>
          )}
        </form>
      </DemoCard>
    </>
  );
}
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  role: yup.string().required("Choose a role"),
});
function LibraryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  return (
    <>
      <PageIntro
        kicker="Question 07"
        title="Library validation"
        description="The same idea with React Hook Form and Yup handling rules and field errors."
      />
      <DemoCard title="Join the studio" tag="React Hook Form + Yup">
        <form onSubmit={handleSubmit(() => {})}>
          {[
            ["name", "Name", "Aarav Mehta"],
            ["email", "Email", "aarav@example.com"],
          ].map(([key, label, placeholder]) => (
            <div className="field" key={key}>
              <label htmlFor={`lib-${key}`}>{label}</label>
              <input
                id={`lib-${key}`}
                placeholder={placeholder}
                {...register(key)}
              />
              {errors[key] && (
                <small className="error">{errors[key].message}</small>
              )}
            </div>
          ))}
          <div className="field">
            <label htmlFor="role">Role</label>
            <select id="role" {...register("role")}>
              <option value="">Select a role</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
            </select>
            {errors.role && (
              <small className="error">{errors.role.message}</small>
            )}
          </div>
          <button className="btn btn-dark" type="submit">
            Join the list
          </button>
          {isSubmitSuccessful && (
            <p className="success">You are on the list.</p>
          )}
        </form>
      </DemoCard>
    </>
  );
}
function Employees() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch("/employees.json")
      .then((response) => response.json())
      .then(setEmployees);
  }, []);
  return (
    <>
      <PageIntro
        kicker="Question 08"
        title="Employee directory"
        description="Data fetched from employees.json and rendered as a responsive table."
      />
      <DemoCard
        title="People at the company"
        tag={`${employees.length} records`}
      >
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <strong>{employee.name}</strong>
                    <small>{employee.email}</small>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td>{employee.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoCard>
    </>
  );
}
function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ semester: "", div: "", gender: "" });
  useEffect(() => {
    fetch("/students.json")
      .then((response) => response.json())
      .then(setStudents);
  }, []);
  const filtered = students.filter(
    (student) =>
      student.firstname.toLowerCase().includes(search.toLowerCase()) &&
      Object.entries(filters).every(
        ([key, value]) => !value || String(student[key]) === value,
      ),
  );
  return (
    <>
      <PageIntro
        kicker="Question 09"
        title="Student explorer"
        description="Search by firstname, then narrow the results by semester, division, and gender."
      />
      <DemoCard
        title="Student records"
        tag={`${filtered.length} of ${students.length}`}
      >
        <div className="filters">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search firstname..."
            aria-label="Search by firstname"
          />
          {[
            ["semester", "All semesters"],
            ["div", "All divisions"],
            ["gender", "All genders"],
          ].map(([key, label]) => (
            <select
              key={key}
              value={filters[key]}
              onChange={(event) =>
                setFilters({ ...filters, [key]: event.target.value })
              }
              aria-label={label}
            >
              <option value="">{label}</option>
              {[
                ...new Set(students.map((student) => String(student[key]))),
              ].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          ))}
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Semester</th>
                <th>Division</th>
                <th>Gender</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id}>
                  <td>
                    <strong>
                      {student.firstname} {student.lastname}
                    </strong>
                    <small>{student.email}</small>
                  </td>
                  <td>{student.semester}</td>
                  <td>{student.div}</td>
                  <td>{student.gender}</td>
                  <td>{student.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="empty">No students match those filters.</p>
          )}
        </div>
      </DemoCard>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/q1" element={<Profile />} />
          <Route path="/q2" element={<Patterns />} />
          <Route path="/q3" element={<Counter />} />
          <Route path="/q4" element={<StateAndRef />} />
          <Route path="/q5" element={<Clock />} />
          <Route path="/q6" element={<ManualForm />} />
          <Route path="/q7" element={<LibraryForm />} />
          <Route path="/q8" element={<Employees />} />
          <Route path="/q9" element={<Students />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}
export default App;
