import React from 'react'

export default function index(props) {
    return (
        <div>
            <div className="border" style={{ height: '250px', backgroundColor: 'yellow' }}>This is the opened file! {props.id}
                <button key={props.id} className="float-right" onClick={() => props.closeFileFunction(props.id)}>Close</button>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="nav-tab1-tab" data-toggle="tab" href="#nav-tab1" role="tab" aria-controls="nav-tab1" aria-selected="true">Tab1</a>
                        <a className="nav-item nav-link" id="nav-tab2-tab" data-toggle="tab" href="#nav-tab2" role="tab" aria-controls="nav-tab2" aria-selected="false">Tab2</a>
                        <a className="nav-item nav-link" id="nav-tab3-tab" data-toggle="tab" href="#nav-tab3" role="tab" aria-controls="nav-tab3" aria-selected="false">Tab3</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-tab1" role="tabpanel" aria-labelledby="nav-tab1-tab">Tab 1...</div>
                    <div className="tab-pane fade" id="nav-tab2" role="tabpanel" aria-labelledby="nav-tab2-tab">Tab 2...</div>
                    <div className="tab-pane fade" id="nav-tab3" role="tabpanel" aria-labelledby="nav-tab3-tab">Tab 3...</div>
                </div>
            </div>
        </div>

    )
}
