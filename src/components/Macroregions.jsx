import React from 'react';

const getMacroregions = (str) => {
    const entries = str.split(';');
    const macroregions = entries.map(entry => {
        const parts = entry.split('][');
        return parts[1]
    });
    return macroregions;
};

const Macroregions = ({macroregionsString}) => {
    const macroregions = getMacroregions(macroregionsString);

    return (
        <div>
            {macroregions.map((region, index) => (
                <div key={index}>{region}</div>
            ))}
        </div>
    );
};

export default Macroregions;