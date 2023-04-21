# React Refresh
## React Tutorial - Dojo-blog - Net Ninja
https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d

## React Hook - Web Dev Simplified
https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h

<br/>

## React and React-Router installation
```bash
npx create-react-app my-app # javascript project
npx create-react-app my-app --template typescript # ts project

npm install react-router-dom
```

## Startup
```bash
# react
npm start

# json-server for API
npx json-server --watch data/db.json --port 8000 --delay 1000
```
<br/>


## useState
- useState keeps a page's state, when the update method is called the page is re-rendered and the page is updated.

### Different variations of useState()
```js
// Variations of useState:
// 1. useState takes a function
const [count, setCount] = useState(() => getValue())

// 2. useState takes a value
const [count, setCount] = useState(getValue())

// NOTE: For #2, getValue() will be exec EVERYTIME when page is 
// re-rendered (e.g. when setCount is called)
// NOT A GOOD OPTION if getValue() takes a long time to exec.

```
### Different variations of set method
```js
const [count, setCount] = useState(5);

// method setCount() is to update the state
// which will also make the page to re-render
setCount(6);

// or another variation of the set function
setCount((prevCount) => prevCount + 1);
```

### useState - if state is an object
```js
const [state, setState] = useState({count: 4, theme: 'blue'});

// Need to use a spread operator, theme remains 'blue'
setState(prevState => {
    return {...prevState, count: prevState.count - 1};
});
```
<br/>



## useEffect
- useEffect runs at every page render
    - which includes initial page render
    - or useState state update page re-render
- **Be careful** when changing the state inside useEffect
    - updating state -> re-render -> useEffect -> **infinite loop**
- useEffect dependencies
    - pass in the dependency array

```js
// Basic without dependencies
useEffect(() => {
    console.log('use effect ran');
});
```

```js
// With dependency array

// empty dependency array means useEffect only
// runs at initial page render
useEffect(() => {
    console.log('use effect ran');
}, []);


const [name, setName] = useState('mario');

// this useEffect runs at initial page render and 
// when "name" is updated by setName
useEffect(() => {
    console.log('use effect ran');
}, [name]);
```

### Fetch in useEffect
```js
useEffect(() => {
    fetch('http://localhost:8000/blogs')
        .then(res => {
            if (!res.ok) {
                throw Error('Could not fetch data for resource');
            }
            return res.json();
        })
        .then((data) => {
            setBlogs(data);
            setIsPending(false);
            setError(null);
        })
        .catch((err) => {
            // catches network errors + http not OK errors
            setIsPending(false);
            setError(err.message);
        })
}, []);
```

### useEffect with a Clean Up function
- Clean up is useful when a component unmounts before a promise resolves
- To avoid memory leaks
- Cleanup function executed automatically when the component unmounts
- **NOTE:** When abortCont.abort() is called, err will be thrown, Make sure no set state method is called in catch() **(reason component is unmounted)**
```js
useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
        .then(res => {
            ...
        })
        .catch((err) => {
            // we don't want to update the state
            if (err.name === 'AbortError') {
                console.log('fetch aborted');
            }
            else {
                // catches network errors + http not OK errors
                setIsPending(false);
                setError(err.message);
            }
        })
    // Use clean up function here to abort
    return () => abortCont.abort();
}, [url]);
```
<br/>

## useNavigate (from react-router-dom v6)
- support goForward, goBack and redirect functionalities
```js
const navigate = useNavigate();

navigate(-1);      // go back 1 page
navigate(1);       // go forward 1 page
navigate('/home'); // redirect to another page
```
<br/>

## Custom Hook
- A custom hook must start with a prefix useXXXX
- A custom hook can also include other hooks
- Parameters and return are also available

```js
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch data');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                // catches network errors + http not OK errors
                setIsPending(false);
                setError(err.message);
            })
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;
```
<br/>



## React-Router Link vs HTML anchor
- Using Link, React intercepts a route to NOT hit the server when a link is clicked
- Using HTML anchor works, but the app will hit the server when a link is clicked
```js
<Link to="/">Home</Link>
<a href="/create">New Blog</a>
```
<br/>

## StrictMode
- StrictMode is used to identify potential issues in a web app.
- **NOTE:** It may render components twice in DEV mode **(useEffect exec 2x)**

```js
// To disable StrictMode in index.js:
// <React.StrictMode>
<App />
// </React.StrictMode>
```