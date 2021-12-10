```jsx
const [day, setDay] = useState('Monday');
const [days, setDays] = useState([]);
const [appointments, setAppointments] = useState({})
```

becomes...
```jsx
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {}
});
```

* accesssing state is done like

```jsx
state.days
// instead of
days
```

* setting can be done by creating a function
```jsx
const setDay = day => setState({ ...state, day });
// called wiht
setDay(value);
```

* the ```...state``` is required to ensure state for everything else isnt reset!

* setDays is a little different because it is an array (being used in useEffect)
```jsx
const setDays = days => setState(prev => ({ ...prev, days }));
```
the previous value is required to ensure that the previous values are being included