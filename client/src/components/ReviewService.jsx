/* eslint-disable react/react-in-jsx-scope */
import ReviewsContainer from './ReviewsContainer.jsx';
const ReviewsService = () => {
    return window.__initialData__ ? (
        <ReviewsContainer reviewInfo={window.__initialData__.reviewInfo} reviewsList={window.__initialData__.reviews} />
    ) : (
        <ReviewsContainer />
    );
};

export default ReviewsService;
