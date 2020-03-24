import Model from "../ModelTypes/Model";
import ObjModel from "../ModelTypes/ObjModel";
import ModelFactory from "../ModelTypes/ModelFactory";
import GltfModel from "../ModelTypes/GltfModel";

describe('3d Models instanciations', function() {
	it('Test if a raw model can instanciated', function() {
        const instanciateRawModel = () => {
            const model = new Model();
        };
		expect(instanciateRawModel).toThrow(TypeError);
    });
    
    it('Test if we can instanciate a .obj 3d model', function() {
        const model = new ModelFactory().makeModel({
            name: "test",
            type: "obj"
        });
        expect(model).toEqual(expect.any(ObjModel));
    })

    it('Test if we can instanciate a .gltf 3d model', function() {
        const model = new ModelFactory().makeModel({
            name: "test",
            type: "gltf"
        });
        expect(model).toEqual(expect.any(GltfModel));
    })
});

describe('HTML elements generation', function () {
    it('Test if the created obj model has the right attributes without material and parameters', function() {
        const model = new ModelFactory().makeModel({
            name: "test",
            type: "obj",
            model: "url-to-the-model"
        });

        const expectedElement = document.createElement("a-obj-model");
        expectedElement.setAttribute("src", "#test-model");

        expect(model.createEntity().outerHTML).toBe(expectedElement.outerHTML);
    });

    it('Test if the created obj model has the right attributes with material and without parameters', function() {
        const model = new ModelFactory().makeModel({
            name: "test",
            type: "obj",
            model: "url-to-the-model",
            material: "url-to-the-material"
        });
        const expectedElement = document.createElement("a-obj-model");
        expectedElement.setAttribute("src", "#test-model");
        expectedElement.setAttribute("mtl", "#test-material");

        expect(model.createEntity().outerHTML).toBe(expectedElement.outerHTML);
    });

    it('Test if the created obj model has the right attributes with parameters', function() {
        const model = new ModelFactory().makeModel({
            name: "test",
            type: "obj",
            model: "url-to-the-model",
            material: "url-to-the-material",
            parameters: {
                scale: 'xVal yVal zVal'
            }
        });
        let entity = model.createEntity();
        entity = model.applyEntityParameters(entity);

        const expectedElement = document.createElement("a-obj-model");
        expectedElement.setAttribute("src", "#test-model");
        expectedElement.setAttribute("mtl", "#test-material");
        expectedElement.setAttribute("scale", "xVal yVal zVal");

        expect(entity.outerHTML).toBe(expectedElement.outerHTML);
    });
})
