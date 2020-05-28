import React from 'react'

export default function index(props) {
    let { id, name, owner } = props.file;
    return (
        <div className="border mt-1 pl-1">
                <div>username: ---{owner}</div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="read" disabled checked="checked" />
                    <label class="form-check-label" for="read">Read</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" class="form-check-input" id="write" />
                    <label class="form-check-label" for="write">Write</label>

                </div>
                <div className="form-check">
                    <input type="checkbox" class="form-check-input" id="share" />
                    <label class="form-check-label" for="share">Share</label>
                </div>
            </div>
    )
}
