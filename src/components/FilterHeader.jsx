import { Dropdown } from './DropdownMenu/Dropdown'
import { DropdownItem } from './DropdownMenu/DropdownItem'

import { useDisplay } from '../contexts/DisplayContext'

import '../css/FilterHeader.css'

export default function FilterHeader(){

    const { display, setDisplay } = useDisplay();

    return (
        <div className="filter-container-header">
            <Dropdown
            offsetLeft={'10px'}
            align="left"
            trigger={({ open }) => (
                <button className="filter-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/></svg>
                    <span>Filter</span>
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

            <Dropdown
                offsetRight={'10px'}
                align="right"
                trigger={({ open }) => (
                    <button className="filter-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M300-360h60v-160h-60v50h-60v60h60v50Zm100-50h320v-60H400v60Zm200-110h60v-50h60v-60h-60v-50h-60v160Zm-360-50h320v-60H240v60Zm80 450v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z"/></svg>
                        <span>Display</span>
                    </button>
                )}
                width={200}
            >
            {({ close }) => (
                <div className="display-choosing-container">
                    <button className="display-button grid" 
                        onClick={() => {
                            setDisplay("grid");
                            close();
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid-icon lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                        <span>Grid</span>
                    </button>
                    <button className="display-button list"
                        onClick={() => {
                            setDisplay("list");
                            close();
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-logs-icon lucide-logs"><path d="M3 5h1"/><path d="M3 12h1"/><path d="M3 19h1"/><path d="M8 5h1"/><path d="M8 12h1"/><path d="M8 19h1"/><path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/></svg>{}
                        <span>List</span>
                    </button>
                </div>
            )}
            </Dropdown>
        </div>
    )
}