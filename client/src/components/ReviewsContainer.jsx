/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import ReviewsList from './ReviewsList.jsx';
import Title from './Title.jsx';
import Stats from './Stats.jsx';
import { getReviewsData } from '../actions/index.js';

const ReviewsContainer = ({ reviewsList = null, reviewInfo = null }) => {
    const [data, setData] = React.useState({ reviewsList, reviewInfo });

    React.useEffect(() => {
        if (window.__initialData__) delete window.__initialData__;
        if (reviewInfo === null) {
            getReviewsData()
                .then(({ data }) => {
                    setData({ reviewInfo: data.reviewInfo, reviewsList: data.reviews });
                })
                .catch(() => setData({ reviewsList: [], reviewInfo: { reviewCount: 0, avg: null } }));
        }
    }, []);

    return data.reviewInfo ? (
        <div className="reviews-section-container">
            <Title />
            <Stats reviewInfo={data.reviewInfo} />
            <ReviewsList reviewsList={data.reviewsList} />
        </div>
    ) : null;
};

export default ReviewsContainer;
