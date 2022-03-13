import { useState } from 'react';

import { IItem } from './index';

const Key = (props: { name: string }) => {
    const [isEdited, setIsEdited] = useState(false);
    const [realName, setRealName] = useState(props.name);
    const [changedName, setChangedName] = useState(props.name);

    const openNameInput = (): void => {
        setIsEdited(true);
    };

    const handleChangeName = (evt: any): void => {
        setChangedName(evt.target.value);
    };

    const editName = (evt: any): void => {
        if (evt.key === 'Escape') {
            setIsEdited(false);
            setChangedName(realName);
        } else if (evt.key === 'Enter') {
            setIsEdited(false);
            setRealName(changedName);
        }
    };

    document.addEventListener('keydown', editName);

    return (
        <>
            {isEdited ? (
                <input
                    onChange={handleChangeName}
                    type="text"
                    value={changedName || ''}
                />
            ) : (
                <div onClick={openNameInput}>{realName}</div>
            )}
        </>
    );
};

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    let list: IItem[] = props.initialData.concat();
    let newList: IItem[] = props.initialData.concat();
    newList.reverse();
    list = props.sorting === 'ASC' ? list : newList;

    return (
        <div>
            {list.map((item) => (
                <Key key={item.id} name={item.name} />
            ))}
        </div>
    );
}
