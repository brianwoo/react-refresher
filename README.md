# React Refresher
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
    - dependencies are related by OR. i.e. ONE dependency is changed useEffect is going to exec.

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

## useMemo
- useMemo is used to cache a value and to return a cached value to speed things up
- **Benefit #1**: useMemo is useful when a slow operation is used
- When a function is wrapped by useMemo, if the dependency has not been changed, the same (cached) value is returned
- **Benefit #2**: useMemo is useful if its return value is an  object reference. The returned ref remains the same if a dependency passed in has not been changed. This ref can be used as a dependency of another useEffect and to determine (via referential equality) if this useEffect is executed or not 
- [useMemo Example](./src/UseMemoDemo.js)

<br/>

## useCallback
- useCallback is used to cache a created function. A function is not created again until a dependency is changed
- Similar to useMemo, useCallback returns a function, not a value
- **Benefit**: useCallback is useful when used with useEffect where a function ref returned from useCallback is used as a dependency in useEffect. This tells if useEffect to execute or not
- [useCallback Example](./src/UseCallbackDemo.js)

<br/>


## useRef
- **Use case #1**: useRef is similar to useState but unlike useState, useRef does NOT cause a re-render the page when a useRef value is updated
- **Use case #2**: useRef is also used to reference a DOM object
- When passing a ref to a custom component, need to React.forwardRef()
- [useRef Example 1](./src/UseRefDemo.js)
- [useRef Example 2](./src/UseRefDemo1.js)

<br/>

## useContext
- useContext is used to pass values / functions down to the child components without prop drilling (i.e. a global state to children)
- It's also possible to wrap useContext with a custom hook (Example #2)
- [useContext Example 1](./src/UseContextDemo.js)
- [useContext Example 2](./src/UseContextDemo1.js)
- Better way of implementing context:
    - [ContextComponent Example 3](./src/ContextComponent2.tsx)
    - [useContext Example 3](./src/UseContextDemo2.tsx)

<br/>

## useReducer
- useReducer is used to manage states (more complex object)
- When a state is updated, screen is re-rendered
- dispatch function is used to send different actions to a reducer
- A single dispatch function is used instead of individual handlers
- The reducer returns a NEW value / object (not an updated object)
- [useReducer Example 1](./src/UseReducerDemo.js)
- [useReducer Example 2](./src/UseReducerDemo1.js)

<br/>

## useLayoutEffect
- useLayoutEffect is the same as useEffect except:
    - it's synchronously run
    - it's run after React calculates the DOM changes but before it paints these changes to the screen

<br/>

## useTransition (React 18)
- useTransition is used to separate high priority and low priority rendering
- startTransition(): code inside this method is run in low priority
- isPending: bool flag is true if startTransition() is STILL being executed, use this to print "Loading..." message
- [useTransition Example 1](./src/UseTransitionDemo.js)

<br/>

## useDeferredValue (React 18)
- useDeferredValue gives a delay before some information is calculated (similar to debouncing)
- [useDeferredValue Example](./src/UseDeferredValueDemo.js)

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

## useDebugValue (React 18)
- useDebugValue only works in custom hooks
```js
// basic: just print out debug value in React Developer Tools (Component view)
useDebugValue(value);

// This 2nd arg (the function) only exec if debug console is opened
useDebugValue(value, v => getValueSlowly(v));

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


## Optimization (Reducing component from re-rendering)
- Keep a component state local, if possible
- Using hooks - useCallback() & useMemo()
- Memoizing React Components to prevent unneccessary re-rendering
- [Memoizing Component Example](./src/MemoComponent.js)


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
