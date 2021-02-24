import {Vector3} from "./vector3"
import {Matrix4} from "./matrix4"

export class Transform {
    public position: Vector3 = Vector3.zero;
    public rotation: Vector3 = Vector3.zero;
    public scale: Vector3 = Vector3.one;

    /**
     * copies given transform value by value
     * @param transform transform to be copied
     */
    public copyFrom(transform: Transform): void {
        this.position.copyFrom(transform.position);
        this.rotation.copyFrom(transform.rotation);
        this.scale.copyFrom(transform.scale);
    }

    /**
     * gets transformation matrix
     */
    public getTransformationMatrix(): Matrix4 {
        let translation = Matrix4.translation(this.position);
        let rotation = Matrix4.rotationXYZ(
            this.rotation.x,
            this.rotation.y,
            this.rotation.z
        );
        let scale = Matrix4.scale(this.scale);

        // Translation * Rotation * Scale
        return Matrix4.multiply(
            Matrix4.multiply(translation, rotation),
            scale
        );
    }

    public setFromJson(json: any): void {
        if (json.position !== undefined) {
            this.position.setFromJson(json.position);
        }
        if (json.rotation !== undefined) {
            this.rotation.setFromJson(json.rotation);
        }
        if (json.scale !== undefined) {
            this.scale.setFromJson(json.scale);
        }
    }
}
