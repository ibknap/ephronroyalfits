import { useNewsletter } from '@/components/account/newsletter/newsletter_context'

export default function Newsletter({ email }) {
    const { subscribe, unsubscribe } = useNewsletter();

    const handleSubscribe = (email) => { subscribe(email) };
    const handleUnsubscribe = (email) => { unsubscribe(email) };

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
                            <div className="form-check form-switch mb-3">
                                <input className="form-check-input" type="checkbox" id="subscribed" onChange={(e) => e.target.checked ? handleSubscribe(email) : handleUnsubscribe(email)} />
                                <label className="form-check-label" htmlFor="subscribed">
                                    I want to receive occasional newsletters
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}