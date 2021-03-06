#
#   This file is part of Magnum.
#
#   Copyright © 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018
#             Vladimír Vondruš <mosra@centrum.cz>
#
#   Permission is hereby granted, free of charge, to any person obtaining a
#   copy of this software and associated documentation files (the "Software"),
#   to deal in the Software without restriction, including without limitation
#   the rights to use, copy, modify, merge, publish, distribute, sublicense,
#   and/or sell copies of the Software, and to permit persons to whom the
#   Software is furnished to do so, subject to the following conditions:
#
#   The above copyright notice and this permission notice shall be included
#   in all copies or substantial portions of the Software.
#
#   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
#   THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
#   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
#   DEALINGS IN THE SOFTWARE.
#

set_directory_properties(PROPERTIES
    CORRADE_CXX_STANDARD 11
    CORRADE_USE_PEDANTIC_FLAGS ON)

find_package(Corrade COMPONENTS TestSuite)

# TODO: causes spurious linker errors on Travis iOS build, so I'm disabling it
if(WITH_DEBUGTOOLS AND Corrade_TestSuite_FOUND AND NOT CORRADE_TARGET_IOS)
    set(SNIPPETS_DIR ${CMAKE_CURRENT_SOURCE_DIR})
    configure_file(${CMAKE_CURRENT_SOURCE_DIR}/configure.h.cmake
                   ${CMAKE_CURRENT_BINARY_DIR}/configure.h)

    # CompareImage documentation snippet. I need it executable so I can
    # copy&paste the output to the documentation. Also mot using
    # corrade_add_test() because it shouldn't be run as part of CTest as it
    # purposedly fails.
    add_executable(debugtools-compareimage debugtools-compareimage.cpp)
    target_link_libraries(debugtools-compareimage PRIVATE MagnumDebugTools)
    target_include_directories(debugtools-compareimage PRIVATE ${CMAKE_CURRENT_BINARY_DIR})
    set_target_properties(debugtools-compareimage PROPERTIES FOLDER "Magnum/doc/snippets")
endif()

if(WITH_SDL2APPLICATION)
    add_executable(getting-started getting-started.cpp)
    add_executable(getting-started-blue getting-started-blue.cpp)
    target_link_libraries(getting-started PRIVATE MagnumSdl2Application)
    target_link_libraries(getting-started-blue PRIVATE MagnumSdl2Application)
    set_target_properties(
        getting-started
        getting-started-blue
        PROPERTIES FOLDER "Magnum/doc/snippets")
endif()
