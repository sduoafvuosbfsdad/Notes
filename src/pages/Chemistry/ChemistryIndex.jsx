import Template from '@/pages/Template';
import GlassContainer from "@/components/GlassContainer.jsx";
import {Link} from "react-router-dom";

export default function ChemistryIndex() {
    return (
        <Template>
            <GlassContainer>
                <div id="title">
                    <h1>Chemistry Notes</h1>
                    <hr/>
                </div>
                <div id="topics">
                    <Link to="/chemistry/12"><h2 className="white">12 Reactivity Series</h2></Link>
                </div>
            </GlassContainer>
        </Template>
    )
}