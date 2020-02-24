import Model from "../ModelTypes/Model";
import ObjModel from "../ModelTypes/ObjModel";
import ModelFactory from "../ModelTypes/ModelFactory";
import GltfModel from "../ModelTypes/GltfModel";

describe('3d Models instanciations', function() {
	it('Test if a raw model can instanciated', function() {
        const instanciateRawModel = () => {
            const model = new Model()
        };
		expect(instanciateRawModel).toThrow(TypeError);
    });
    
    it('Test if we can instanciate a .obj 3d model', function() {
        const model = new ModelFactory().makeModel({
            name: "test",
            type: "obj"
        });
        expect(model).toEqual(expect.any(ObjModel))
    })

    it('Test if we can instanciate a .gltf 3d model', function() {
        const model = new ModelFactory().makeModel({
            name: "test",
            type: "gltf"
        });
        expect(model).toEqual(expect.any(GltfModel))
    })
});
