const Header = ({ courseName }) => {

    return (
        <h2>{courseName}</h2>
    );

}

const Part = ({ part }) => {

    return (
        <p>{part.name} {part.exercises}</p>
    );

}

const Content = ({ parts }) => {

    return (
        <>
        {
            parts.map(part => (
            <Part key={part.id} part={part} />
            ))
        }
        </>
    );

}

const Total = ({ parts }) => {

    const sum = parts.reduce(
        (total, val) => total + val.exercises,
        0
    );

    return (
        <p><b>Total of {sum} exercises</b></p>
    );

}

const Course = ({ course }) => {

    return (
        <div>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} /> 
        </div>
    );

}

export default Course;