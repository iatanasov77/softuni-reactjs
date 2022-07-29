import React from 'react';

const Tac = () => {
    
    return (
        <div id="terms-and-conditions-modal" className="modal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document" style={{maxWidth: "800px"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Terms and Conditions</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div id="TermsPage">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type
                                specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in 
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                and more recently with desktop publishing software like Aldus PageMaker including 
                                versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default Tac;
