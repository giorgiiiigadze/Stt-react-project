import { Dropdown } from './DropdownMenu/Dropdown'
import { DropdownItem } from './DropdownMenu/DropdownItem'

import '../css/FilterHeader.css'

export default function FilterHeader(){
    return (
        <div className="filter-container-header">
            <Dropdown
            align="left"
            trigger={({ open }) => (
                <button className="filter-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/></svg>
                </button>
            )}
            width={200}
            >
            {({ close }) => ( 
                <>
                <DropdownItem onClick={close}>Settings</DropdownItem>
                <DropdownItem onClick={close}>Duplicate</DropdownItem>
                <DropdownItem>
                    Logout
                </DropdownItem>
                </>
            )}
            </Dropdown>
        </div>
    )
}