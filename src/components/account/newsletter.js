import styles from '@/components/account/Account.module.css'

export default function Newsletter() {
    return (
        <>
            <div className="modal fade" id="newsletterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="newsletterModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newsletterModalLabel">Newsletter Preferences</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-check form-switch mb-3">
                                    <input className="form-check-input" type="checkbox" id="subscribed" />
                                    <label className="form-check-label" htmlFor="subscribed">
                                        I want to receive occasional newsletters
                                    </label>
                                </div>
                                <div className="form-check form-switch mt-3">
                                    <input className="form-check-input" type="checkbox" id="unsubscribed" />
                                    <label className="form-check-label" htmlFor="unsubscribed">
                                        I don't want to receive occasional newsletters
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={`btn btn-lg btn-success ${styles.btn_nav}`}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}