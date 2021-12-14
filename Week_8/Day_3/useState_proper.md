# Right
```jsx
const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
```

if props.student is null or undefined use ""
if props.interviewer is null or undefined use null

# Wrong
```jsx
/* This is an example of what NOT to do when creating state */

if(props.student) {
  const [student, setStudent] = useState(props.student);
} else {
  const [student, setStudent] = useState("");
}
```