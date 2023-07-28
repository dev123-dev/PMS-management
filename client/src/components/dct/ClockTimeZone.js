import React, { useEffect, useState } from "react";
import Clock from "react-live-clock";

const ClockTimeZone = ({
    Region,
    highlightTimeZone
}) => {
    const [showTimeZoneSection, setShowTimeZoneSection] = useState({
        showUSSection: false,
        showAUDSection: false,
        showUKSection: false,
        showNZSection: false,
        showUAESection: false,
        showFranceSection: false,
        showIrelandSection: false,
        showTurkeySection: false,
        showPortugalSection: false,
        showGermanySection: false,
        showSwitzerlandSection: false,
        showItalySection: false,
        showGreeceSection: false,
        showPolandSection: false,
        showCyprusSection: false,
        showSingaporeSection: false,
        showSpainSection: false
    });

    const { showUSSection,
        showAUDSection,
        showUKSection,
        showNZSection,
        showUAESection,
        showFranceSection,
        showIrelandSection,
        showTurkeySection,
        showPortugalSection,
        showGermanySection,
        showSwitzerlandSection,
        showItalySection,
        showGreeceSection,
        showPolandSection,
        showCyprusSection,
        showSingaporeSection,
        showSpainSection } = showTimeZoneSection;

    useEffect(() => {
        if (Region === "US") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: true,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "AUS") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: true,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "UK") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: true,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "New Zealand") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: true,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "United Arab Emirates") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: true,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "FRANCE") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: true,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "IRELAND") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: true,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "Turkey") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: true,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "Portugal") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: true,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "Germany") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: true,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "Switzerland") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: true,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "Italy") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: true,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "Greece") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: true,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "Poland") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: true,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "Cyprus") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: true,
                showSingaporeSection: false,
                showSpainSection: false
            });
        } else if (Region === "Singapore") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: true,
                showSpainSection: false
            });
        } else if (Region === "Spain") {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: true
            });
        }
        else {
            setShowTimeZoneSection({
                ...showTimeZoneSection,
                showUSSection: false,
                showAUDSection: false,
                showUKSection: false,
                showNZSection: false,
                showUAESection: false,
                showFranceSection: false,
                showIrelandSection: false,
                showTurkeySection: false,
                showPortugalSection: false,
                showGermanySection: false,
                showSwitzerlandSection: false,
                showItalySection: false,
                showGreeceSection: false,
                showPolandSection: false,
                showCyprusSection: false,
                showSingaporeSection: false,
                showSpainSection: false
            });
        }
    }, [Region, highlightTimeZone])

    return (
        <div>
            {showUSSection && (
                <h6>
                    <b>PST :</b>
                    <Clock
                        style={
                            highlightTimeZone && highlightTimeZone === "PST"
                                ? { backgroundColor: "yellow" }
                                : { backgroundColor: "white" }
                        }
                        ticking={true}
                        timezone={"US/Pacific"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                    &emsp;&emsp; <b>MST :</b>
                    <Clock
                        style={
                            highlightTimeZone && highlightTimeZone === "MST"
                                ? { backgroundColor: "yellow" }
                                : { backgroundColor: "white" }
                        }
                        ticking={true}
                        timezone={"US/Mountain"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />{" "}
                    &emsp;&emsp; <b>EST :</b>
                    <Clock
                        style={
                            highlightTimeZone && highlightTimeZone === "EST"
                                ? { backgroundColor: "yellow" }
                                : { backgroundColor: "white" }
                        }
                        ticking={true}
                        timezone={"US/Eastern"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />{" "}
                    &emsp;&emsp; <b>CST :</b>
                    <Clock
                        style={
                            highlightTimeZone && highlightTimeZone === "CST"
                                ? { backgroundColor: "yellow" }
                                : { backgroundColor: "white" }
                        }
                        ticking={true}
                        timezone={"US/Central"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showAUDSection && (
                <h6>
                    <b>Sydney :</b>
                    <Clock
                        style={
                            highlightTimeZone && highlightTimeZone === "Sydney"
                                ? { backgroundColor: "yellow" }
                                : { backgroundColor: "white" }
                        }
                        ticking={true}
                        timezone={"Australia/Sydney"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                    &emsp; &emsp;<b>Perth :</b>
                    <Clock
                        style={
                            highlightTimeZone && highlightTimeZone === "Perth"
                                ? { backgroundColor: "yellow" }
                                : { backgroundColor: "white" }
                        }
                        ticking={true}
                        timezone={"Australia/Perth"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showUKSection && (
                <h6>
                    <b>UK :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/London"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showNZSection && (
                <h6>
                    <b>NZ :</b>
                    <Clock
                        ticking={true}
                        timezone={"NZ"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showUAESection && (
                <h6>
                    <b>UAE :</b>
                    <Clock
                        ticking={true}
                        timezone={"Asia/Dubai"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showFranceSection && (
                <h6>
                    <b>France :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Paris"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showIrelandSection && (
                <h6>
                    <b>Ireland :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Dublin"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showTurkeySection && (
                <h6>
                    <b>Turkey :</b>
                    <Clock
                        ticking={true}
                        timezone={"Turkey"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showPortugalSection && (
                <h6>
                    <b>Portugal :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Lisbon"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showGermanySection && (
                <h6>
                    <b>Germany :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Berlin"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showSwitzerlandSection && (
                <h6>
                    <b>Switzerland :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Zurich"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showItalySection && (
                <h6>
                    <b>Italy :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Zurich"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showGreeceSection && (
                <h6>
                    <b>Greece :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Athens"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showPolandSection && (
                <h6>
                    <b>Poland :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Warsaw"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showCyprusSection && (
                <h6>
                    <b>Cyprus :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Nicosia"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showSingaporeSection && (
                <h6>
                    <b>Singapore :</b>
                    <Clock
                        ticking={true}
                        timezone={"Singapore"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
            {showSpainSection && (
                <h6>
                    <b>Spain :</b>
                    <Clock
                        ticking={true}
                        timezone={"Europe/Madrid"}
                        format={" DD-MM-YYYY, h:mm:ss a"}
                    />
                </h6>
            )
            }
        </div>)
}



export default ClockTimeZone;