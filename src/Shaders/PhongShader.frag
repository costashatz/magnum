#version 330

uniform vec3 ambientColor = vec3(0.0, 0.0, 0.0);
uniform vec3 diffuseColor;
uniform vec3 specularColor = vec3(1.0, 1.0, 1.0);
uniform vec3 lightColor = vec3(1.0, 1.0, 1.0);
uniform float shininess = 80.0;

in vec3 transformedNormal;
in vec3 lightDirection;

out vec4 color;

void main() {
    /* Ambient color */
    color.rgb = ambientColor;

    vec3 normalizedTransformedNormal = normalize(transformedNormal);
    vec3 normalizedLightDirection = normalize(lightDirection);

    /* Add diffuse color */
    float intensity = max(0.0, dot(normalizedTransformedNormal, normalizedLightDirection));
    color.rgb += diffuseColor*lightColor*intensity;

    /* Add specular color, if needed */
    if(intensity != 0) {
        vec3 reflection = reflect(-normalizedLightDirection, normalizedTransformedNormal);
        float specularity = pow(max(0.0, dot(normalizedTransformedNormal, reflection)), shininess);
        color.rgb += specularColor*specularity;
    }

    /* Force alpha to 1 */
    color.a = 1.0;
}
