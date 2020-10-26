import React, {ChangeEvent} from 'react';
import {useState} from 'react';
import logo from './logo.svg';
import './App.css';

interface TagsListProps {
    items: string[],
    onItemSelected?: any
}

const TagsList = (props: TagsListProps)=> {
    const {items, onItemSelected} = props
    const onClick = (item:any) =>{
        if (onItemSelected != null) {
            onItemSelected(item)
        }
    }
    const itemsLayout = items.map((item) =>
        <div className="tag-list-item" key={item} onClick={() => onClick(item)}>{item}</div>
    )
    return  (
        <div className="tag-list">
            {itemsLayout}
        </div>
    )
}

const defaultItems:string[] = []

const getTags = async (substring: string) => {
    const result = await fetch('http://localhost:3000/tags?q='+substring)
    return await result.json()
}

const saveTag = async (tag: string) => {
    return await fetch('http://localhost:3000/tags', {method:'POST', headers:{
        "Content-Type":"application/json"
        }, body: JSON.stringify({"tag":tag})})
}

function App() {
    const [state, setState] = useState(defaultItems)
    const [text, setText] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const onChange = (event:any) => {
        const newValue = event.target.value;
        console.log(event.target.value)
        if (newValue != null){
            getTags(newValue).then((data) => setState(data))
            setText(newValue)
        }
    }

    const onButtonClick = (event: any) => {
        addNewTag(text)
    }

    const addNewTag = (tag: string) => {
        if (tags.includes(tag)) return
        if (!state.includes(tag)) {
            saveTag(tag)
                .then((res)=> console.log(res))
                .catch((err) => console.warn(err))
        }
        tags.push(tag)
        setTags(tags)
        setText(tag)
    }

  return (
    <div className="App">
        <div>
            <div>
                <input type="text" onChange={onChange} value={text}/>
                <button onClick={onButtonClick}>Add</button>
            </div>
            <h2>Suggested Tags</h2>
            <TagsList items={state} onItemSelected={(item: any) => addNewTag(item)}/>
            <h2>Selected tags</h2>
            <TagsList items={tags}/>
        </div>
    </div>
  );
}

export default App;
